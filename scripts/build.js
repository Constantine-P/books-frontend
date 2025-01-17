import { cp, rm, readFile, writeFile } from 'node:fs/promises';

(async () => {
  try {
    await cp('build/client/.', 'build', {
      recursive: true,
    });
    await rm('build/client', { recursive: true, force: true });
    const file = await readFile('build/index.html', { encoding: 'utf-8' });
    const output = file.replaceAll('/assets/', '/books-frontend/assets/');
    await writeFile('build/index.html', output, { encoding: 'utf-8' });
  } catch (err) {
    console.error(err);
  }
})();
