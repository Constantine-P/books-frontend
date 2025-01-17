import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import React, { useCallback, useMemo } from 'react';

import { LinkList } from '@/components/LinkList';
import { slugify } from '@/helpers/slugify';
import { useStore } from '@/store/useStore';

import styles from './style.module.css';

type Props = {
  isVisible: boolean;
  toggle(): void;
};

export function Navigation({ isVisible, toggle }: Props) {
  const {
    state: { activeNode, bookTree },
  } = useStore();

  const chapterList = useMemo(() => {
    if (!activeNode) return [];
    const { parent, depth } = activeNode;
    if (depth === 1) {
      return bookTree;
    }
    if (!parent) return [];
    return [parent];
  }, [activeNode, bookTree]);

  const subParagraphList = useMemo(
    () =>
      Array.from(activeNode?.html?.matchAll(/<h2>(.+)<\/h2>/g) ?? []).map((x) => ({
        label: x[1],
        localSrc: `#${slugify(x[1])}`,
      })),
    [activeNode?.html]
  );

  const handleButtonClick = useCallback(() => {
    toggle();
  }, [toggle]);

  if (!activeNode) {
    return <div className={styles.navigation} />;
  }

  return (
    <div className={classNames(styles.navigation, { [styles.hidden]: !isVisible })}>
      <div className={styles.navigationInner}>
        <h3 className={styles.subHeader}>{activeNode?.depth > 1 ? 'Глава' : 'Смежные главы'}</h3>
        <LinkList children={chapterList} depth={1} />
        {activeNode.depth > 1 && subParagraphList.length > 0 && (
          <>
            <h3 className={styles.subHeader}>Навигация по параграфу</h3>
            <LinkList children={subParagraphList} depth={1} />
          </>
        )}
      </div>
      <Button className={styles.button} icon="pi pi-bars" rounded onClick={handleButtonClick} />
    </div>
  );
}
