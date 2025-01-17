import React from 'react';

import { LinkList } from '@/components/LinkList';
import { useStore } from '@/store/useStore';

import styles from './style.module.css';

export function ContentsPage() {
  const { state } = useStore();
  return (
    <div className={styles.contents}>
      <h1 className={styles.title}>Содержание</h1>
      <LinkList children={state.bookTree} markers={['none', 'numeric']} depth={2} />
    </div>
  );
}
