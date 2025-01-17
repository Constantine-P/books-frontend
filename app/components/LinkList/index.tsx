import { classNames } from 'primereact/utils';
import React from 'react';

import { Link } from 'react-router';

import styles from './style.module.css';

type ListItem = {
  localSrc: string;
  label: string;
  children?: ListItem[] | null;
};

type Marker = 'numeric' | 'dot' | 'none';

type Props = {
  children: ListItem[];
  markers?: Marker[];
  depth?: 1 | 2;
};

export function LinkList({ children, markers, depth = 2 }: Props) {
  return (
    <div className={styles.LinkList}>
      {children.map((x, i) => (
        <div
          className={classNames([
            styles.levelOne,
            (depth === 1 || (depth > 1 && !children?.length)) && styles.onlyOneLevel,
          ])}
          key={x.localSrc}
        >
          <div className={styles.linkWrapper}>
            {markers?.[0] === 'numeric' && <span className={styles.numericMarker}>{i + 1}.</span>}
            {markers?.[0] === 'dot' && <span className={styles.dotMarker} />}
            <Link className={styles.levelOneLink} to={x.localSrc}>
              {x.label}
            </Link>
          </div>
          {depth > 1 && !!x.children?.length && (
            <div className={styles.levelTwo}>
              {x.children?.map((y, j) => (
                <div className={styles.linkWrapper} key={y.localSrc}>
                  {markers?.[1] === 'numeric' && (
                    <span className={styles.numericMarker}>
                      {i + 1}.{j + 1}.
                    </span>
                  )}
                  {markers?.[1] === 'dot' && <span className={styles.dotMarker} />}
                  <Link className={styles.levelTwoLink} to={y.localSrc}>
                    {y.label}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
