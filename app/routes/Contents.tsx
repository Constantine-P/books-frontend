import { ContentsPage } from '@/pages/Contents';

import type { Route } from './+types/Contents';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Contents' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Contents() {
  return <ContentsPage />;
}
