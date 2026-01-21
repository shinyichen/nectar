import { Box, Skeleton } from '@chakra-ui/react';

const SearchFacetSkeletonOpen = () => {
  return (
    <Box w="64" my={1} borderColor="gray.200" borderWidth={1}>
      <Skeleton height="15px" />
      <Skeleton height="15px" />
      <Skeleton height="15px" />
      <Skeleton height="15px" />
      <Skeleton height="15px" />
    </Box>
  );
};

const SearchFacetSkeletonClosed = () => {
  return (
    <Box w="64" my={1} borderColor="gray.200" borderWidth={1}>
      <Skeleton height="15px" />
    </Box>
  );
};

export const SearchFacetSkeletons = () => {
  return (
    <Box>
      {[0, 1, 2, 3, 4].map((i) => (
        <SearchFacetSkeletonOpen key={`skeleton-o-${i}`} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <SearchFacetSkeletonClosed key={`skeleton-c-${i}`} />
      ))}
    </Box>
  );
};
