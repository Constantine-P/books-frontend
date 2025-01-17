import { marked } from 'marked';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { loadBookMetadata } from '@/api/loaders/loadBookMetadata';
import { loadFileText } from '@/api/loaders/loadFileText';

import { getFileUri } from '@/constants/repository';
import { find, toBookTree } from '@/helpers/tree';
import { StateContext } from '@/store/StoreContext';

import type { Theme, TreeNode } from '@/types';

type Props = {
  children: React.ReactNode;
};

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookTree, setBookTree] = useState<TreeNode[]>([]);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const node = useMemo(() => (id ? find(bookTree, id) : null), [id, bookTree]);
  const [isNavigationVisible, setIsNavigationVisible] = useState(true);

  useEffect(() => {
    setIsNavigationVisible(window.localStorage.getItem('navigation') === 'visible');
  }, []);

  const html = useMemo(() => {
    const text = marked.parse(markdown ?? '', { gfm: true }) as string;
    const regexp = /(?<=<img.*?src=")(?<src>.*?)(?=")/g;
    return text.replaceAll(regexp, (_, src) => getFileUri(`${node?.path}/${src}`));
  }, [markdown, node]);

  const activeNode = useMemo(() => (node ? { ...node, html } : null), [html, node]);

  const refreshParagraph = useCallback(() => {
    if (!activeNode || !activeNode.isEndpoint || !activeNode.path) return;
    setIsLoading(true);
    setMarkdown(null);
    loadFileText(`main:${activeNode.path}/_article.md`)
      .then((data) => {
        setMarkdown(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeNode]);

  const refreshBookTree = useCallback(async () => {
    setIsLoading(true);
    const [bookLabelNamesText, metadata] = await Promise.all([
      loadFileText('main:book/filenames.json'),
      loadBookMetadata(),
    ]);
    let bookLabelNames: Record<string, string> = {};
    if (bookLabelNamesText) {
      try {
        bookLabelNames = JSON.parse(bookLabelNamesText);
      } catch (e) {
        console.log(e);
      }
    }
    if (metadata) {
      setBookTree(toBookTree(metadata, bookLabelNames));
    }
    setIsLoading(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((x) => (x === 'dark' ? 'light' : 'dark'));
  }, []);

  const next = useCallback(() => {
    if (activeNode?.next) {
      navigate(activeNode?.next.localSrc);
    }
  }, [activeNode, navigate]);

  const prev = useCallback(() => {
    if (activeNode?.prev) {
      navigate(activeNode?.prev.localSrc);
    }
  }, [activeNode, navigate]);

  useEffect(() => {
    refreshParagraph();
  }, [activeNode, refreshParagraph]);

  useEffect(() => {
    refreshBookTree();
  }, [refreshBookTree]);

  useEffect(() => {
    document.documentElement.setAttribute('style', `color-scheme: ${theme};`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useLayoutEffect(() => {
    setTheme((localStorage.getItem('theme') as Theme) ?? 'light');
  }, []);

  return (
    <StateContext.Provider
      value={{
        state: { isLoading, bookTree, activeNode, theme, isNavigationVisible },
        methods: { toggleTheme, next, prev },
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
