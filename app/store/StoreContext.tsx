import React from 'react';

import type { TreeNode } from '@/types';

type State = {
  isLoading: boolean;
  bookTree: TreeNode[];
  activeNode: (TreeNode & { html: string | null }) | null;
  theme: 'dark' | 'light';
  isNavigationVisible: boolean;
};

type Methods = {
  toggleTheme(): void;
  prev(): void;
  next(): void;
};

type ContextValue = {
  state: State;
  methods: Methods;
};

export const StateContext = React.createContext<ContextValue>({
  state: {
    isLoading: false,
    bookTree: [],
    activeNode: null,
    theme: 'dark',
    isNavigationVisible: true,
  },
  methods: {
    toggleTheme: () => undefined,
    prev: () => undefined,
    next: () => undefined,
  },
});
