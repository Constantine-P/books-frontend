import { client } from '@/api/client';
import { repositoryName, repositoryOwner } from '@/constants/repository';

import BookMetadata from './query.graphql';

import type { RepositoryTreeEntry } from '@/types';
import type { BookMetadataQuery } from '@/types/graphql-generated';
import type { ApolloQueryResult } from '@apollo/client/core/types';

export async function loadBookMetadata(): Promise<RepositoryTreeEntry[] | null> {
  const response: ApolloQueryResult<BookMetadataQuery> = await client.query({
    query: BookMetadata,
    variables: {
      owner: repositoryOwner,
      name: repositoryName,
    },
  });

  if (response.error) {
    console.error(response.error.message);
    return null;
  }

  const object = response.data.repository?.object;
  if (object?.__typename !== 'Tree' || !object.entries) {
    return null;
  }

  return object.entries.filter((entry) => entry.type === 'tree');
}
