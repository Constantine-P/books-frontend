import { cp, rm, readFile, writeFile, readdir } from 'node:fs/promises';

(async () => {
  try {
    await cp('build/client/.', 'build', {
      recursive: true,
    });
    await rm('build/client', { recursive: true, force: true });
    // await cp('build/assets/.', 'build', {
    //   recursive: true,
    // });
    // await rm('build/assets', { recursive: true, force: true });
    // const fileNames = await readdir('build');
    // for (const fileName of fileNames) {
    //   const file = await readFile(`build/${fileName}`, { encoding: 'utf-8' });
    //   const output = file.replaceAll('/assets', '');
    //   await writeFile(`build/${fileName}`, output, { encoding: 'utf-8' });
    // }
  } catch (err) {
    console.error(err);
  }
})();
