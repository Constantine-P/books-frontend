import { useContext } from 'react';

import { StateContext } from '@/store/StoreContext';

export function useStore() {
  return useContext(StateContext);
}
