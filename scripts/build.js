import { join } from 'path';
import { cp, rm } from 'node:fs/promises';

(async () => {
  try {
    await cp('build/client/.', 'build', {
      recursive: true,
    });
    await rm('build/client', { recursive: true, force: true });
  } catch (err) {
    console.error(err);
  }
})();
