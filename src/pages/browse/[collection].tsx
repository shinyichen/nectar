import { explorerCollections } from '@/components/Explorer/data';
import { isExplorerCollection } from '@/components/Explorer/types';
import { SimpleLink } from '@/components/SimpleLink';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const CollectionPage: NextPage = () => {
  const router = useRouter();

  const id = router.query.collection[0];

  if (!id || !isExplorerCollection(id)) {
    return null;
  }

  return (
    <Flex direction="column" gap={6}>
      <SimpleLink href="/browse">
        <ArrowBackIcon boxSize={5} mr={2} />
        Back to Explore
      </SimpleLink>
      <Heading as="h2">{explorerCollections[id].label}</Heading>
    </Flex>
  );
};

export default CollectionPage;
export { injectSessionGSSP as getServerSideProps } from '@/ssr-utils';
