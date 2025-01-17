import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

type Props = {
  children: React.ReactNode;
};

export function SelfScrollingWrapper({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }
    ref.current?.querySelector(location.hash)?.scrollIntoView({ behavior: 'instant' });
  }, []);

  return <div ref={ref}>{children}</div>;
}
