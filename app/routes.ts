// eslint-disable-next-line import/no-unresolved
import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  layout('components/Layout/index.tsx', [
    index('routes/Contents.tsx'),
    route('reader/:id', 'routes/Reader.tsx'),
  ]),
] satisfies RouteConfig;
