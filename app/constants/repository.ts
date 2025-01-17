export const repositoryOwner = 'Constantine-P';

export const repositoryName = 'algorithms';

export const getFileUri = (filePath: string) =>
  `https://github.com/${repositoryOwner}/${repositoryName}/raw/main/${filePath}`;
