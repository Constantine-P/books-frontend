export type TreeNode = {
  children: TreeNode[] | null;
  depth: number;
  isEndpoint: boolean;
  label: string;
  localSrc: string;
  name: string;
  path: string;
  parent: TreeNode | null;
  prev: TreeNode | null;
  next: TreeNode | null;
  type: string;
};

export type RepositoryTreeEntry = {
  __typename?: 'TreeEntry';
  name: string;
  path?: string | null;
  type: string;
  extension?: string | null;
  object?:
    | { __typename?: 'Blob' }
    | { __typename?: 'Commit' }
    | { __typename?: 'Tag' }
    | {
        __typename?: 'Tree';
        entries?: Array<{
          __typename?: 'TreeEntry';
          name: string;
          path?: string | null;
          type: string;
          extension?: string | null;
        }> | null;
      }
    | null;
};

export type Theme = 'dark' | 'light';
