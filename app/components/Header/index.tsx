import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import React from 'react';

import { Link } from 'react-router';

import logo from '@/assets/logo.svg';

import { useStore } from '@/store/useStore';

import styles from './style.module.css';

export function Header() {
  const store = useStore();
  return (
    <div className={styles.header}>
      <Link className={styles.link} to="/">
        <Image className={styles.logo} src={logo} width="60" />
        <span>Алгоритмы. Учебник</span>
      </Link>
      <Button
        className={styles.themeButton}
        icon={`pi ${store.state.theme === 'dark' ? 'pi-sun' : 'pi-moon'}`}
        onClick={store.methods.toggleTheme}
      />
    </div>
  );
}
