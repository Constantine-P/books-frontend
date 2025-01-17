import { ReaderPage } from '@/pages/Reader';

import type { Route } from './+types/Reader';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Reader() {
  return <ReaderPage />;
}
