import type { RepositoryTreeEntry, TreeNode } from '@/types';

const flat = (tree: TreeNode[]) => {
  return tree.reduce((acc, node) => [...acc, node, ...(node.children ?? [])], [] as TreeNode[]);
};

export const find = (tree: TreeNode[], name: string) => {
  return flat(tree).find((x) => x.name === name) ?? null;
};

export const toBookTree = (
  entries: RepositoryTreeEntry[],
  labelMap: Record<string, string> = {},
  parentNode: TreeNode | null = null,
  depth = 1
): TreeNode[] =>
  entries
    .map((entry) => {
      if (!entry.path) {
        throw 'error';
      }
      const node: TreeNode = {
        depth,
        parent: parentNode,
        prev: null,
        next: null,
        name: entry.name,
        path: entry.path,
        type: entry.type,
        label: labelMap[entry.name] ?? entry.name,
        localSrc: `/reader/${entry.name}`,
        children: null,
        get isEndpoint() {
          return this.children === null || !this.children.length;
        },
      };
      if (entry.object && 'entries' in entry.object && entry.object.entries?.length) {
        node.children = toBookTree(entry.object.entries, labelMap, node, depth + 1);
      }
      return node;
    })
    .map((node, index, arr) => ({
      ...node,
      prev: arr[index - 1] ?? null,
      next: arr[index + 1] ?? null,
    }));
