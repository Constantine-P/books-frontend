import React from 'react';

import { BreadCrumbs } from '@/components/BreadCrumbs';
import { ParagraphView } from '@/components/ParagraphView';

import styles from './style.module.css';

export function ReaderPage() {
  return (
    <div className={styles.reader}>
      <div className={styles.readerInner}>
        <BreadCrumbs />
        <ParagraphView />
      </div>
    </div>
  );
}
