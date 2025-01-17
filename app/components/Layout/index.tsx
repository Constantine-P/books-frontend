import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import { Header } from '@/components/Header';

import { Navigation } from '@/components/Navigation';
import { useStore } from '@/store/useStore';

import styles from './style.module.css';

export default function ProjectLayout() {
  const {
    state: { theme, activeNode },
    methods,
  } = useStore();

  const location = useLocation();

  const [isNavigationVisible, setIsNavigationVisible] = useState<boolean>(true);

  useLayoutEffect(() => {
    setIsNavigationVisible(window.localStorage.getItem('navigation') === 'visible');
  }, []);

  useEffect(() => {
    window.localStorage.setItem('navigation', isNavigationVisible ? 'visible' : '');
  }, [isNavigationVisible]);

  const handleNavigationVisibleToggle = useCallback(() => setIsNavigationVisible((x) => !x), []);

  return (
    <div
      className={classNames(styles.layout, {
        [styles.lightTheme]: theme === 'light',
        [styles.darkTheme]: theme === 'dark',
      })}
    >
      <div className={styles.header}>
        <Header />
      </div>
      {location.pathname !== '/' && (
        <div className={styles.navigation}>
          <Navigation isVisible={isNavigationVisible} toggle={handleNavigationVisibleToggle} />
        </div>
      )}
      {location.pathname !== '/' && !!activeNode?.prev && (
        <Button
          className={classNames([styles.navButton, styles.navButtonLeft])}
          icon="pi pi-chevron-left"
          onClick={methods.prev}
        />
      )}
      <div className={styles.outlet}>
        <Outlet />
      </div>
      {location.pathname !== '/' && !!activeNode?.next && (
        <Button
          className={classNames([styles.navButton, styles.navButtonRight])}
          icon="pi pi-chevron-right"
          onClick={methods.next}
        />
      )}
    </div>
  );
}
