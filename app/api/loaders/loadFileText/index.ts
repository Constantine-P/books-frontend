import { client } from '@/api/client';

import { repositoryName, repositoryOwner } from '@/constants/repository';

import FileText from './query.graphql';

import type { FileTextQuery } from '@/types/graphql-generated';

import type { ApolloQueryResult } from '@apollo/client/core/types';

export async function loadFileText(filePath: string): Promise<string | null> {
  const response: ApolloQueryResult<FileTextQuery> = await client.query({
    query: FileText,
    variables: {
      owner: repositoryOwner,
      name: repositoryName,
      filePath,
    },
  });
  if (response.error) {
    console.error(response.error.message);
    return null;
  }
  if (!response.data.repository?.object || !('text' in response.data.repository.object)) {
    return null;
  }
  return response.data.repository.object.text ?? null;
}
