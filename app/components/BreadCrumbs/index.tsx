import { BreadCrumb } from 'primereact/breadcrumb';
import { Skeleton } from 'primereact/skeleton';
import React, { useCallback, useMemo } from 'react';

import { Link } from 'react-router';

import { useStore } from '@/store/useStore';

import styles from './style.module.css';

export function BreadCrumbs() {
  const {
    state: { activeNode, isLoading },
  } = useStore();

  const home = useMemo(
    () => ({
      template: () => (
        <Link className={styles.homeLink} to="/">
          <span className="pi pi-home" />
        </Link>
      ),
    }),
    []
  );

  const model = useMemo(() => {
    return [activeNode?.parent, activeNode].filter(Boolean).map((x) =>
      x
        ? {
            template: () =>
              x.isEndpoint ? (
                x.label
              ) : (
                <Link className={styles.breadCrumbLink} to={x.localSrc}>
                  {x.label}
                </Link>
              ),
          }
        : {}
    );
  }, [activeNode]);

  const skeletonModel = [
    { template: <Skeleton className="h-1 !w-40"></Skeleton> },
    { template: <Skeleton className="h-1 !w-40"></Skeleton> },
  ];

  const separatorIcon = useCallback(() => '→', []);

  return (
    <BreadCrumb
      className={styles.breadCrumb}
      home={home}
      model={isLoading ? skeletonModel : model}
      separatorIcon={separatorIcon}
    />
  );
}
