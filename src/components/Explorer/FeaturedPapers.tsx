import { Button, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { FireIcon, ClockIcon } from '@heroicons/react/20/solid';
import { SimpleLink } from '../SimpleLink';
import { IADSApiSearchParams } from '@/api/search/types';
import { makeSearchParams } from '@/utils/common/search';
import { useMemo } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useColorModeColors } from '@/lib/useColorModeColors';

export const FeaturedPapers = ({ query }: { query: IADSApiSearchParams }) => {
  const colors = useColorModeColors();
  const topPaperHref = useMemo(() => {
    const params = makeSearchParams({
      ...query,
      sort: ['citation_count desc'],
    });
    return `/search?${params}`;
  }, [query]);

  const mostRecentHref = useMemo(() => {
    const params = makeSearchParams({
      ...query,
      sort: ['date desc'],
    });
    return `/search?${params}`;
  }, [query]);

  return (
    <Flex width="full" gap={4}>
      <Button
        as={SimpleLink}
        href={topPaperHref}
        newTab
        variant="ghost"
        borderWidth={1}
        shadow="md"
        flexGrow={1}
        borderLeftRadius="md"
        h="16"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack>
          <Icon
            as={FireIcon}
            width={6}
            height={6}
            p={2}
            boxSizing="content-box"
            bg={colors.highlightBackground}
            borderRadius={100}
          />
          <Text>Top Papers</Text>
        </HStack>
        <ArrowForwardIcon boxSize={5} aria-hidden />
      </Button>
      <Button
        as={SimpleLink}
        href={mostRecentHref}
        newTab
        variant="ghost"
        borderWidth={1}
        shadow="md"
        flexGrow={1}
        h="16"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack>
          <Icon
            as={ClockIcon}
            width={6}
            height={6}
            p={2}
            boxSizing="content-box"
            bg={colors.highlightBackground}
            borderRadius={100}
          />
          <Text>Most Recent</Text>
        </HStack>
        <ArrowForwardIcon boxSize={5} aria-hidden />
      </Button>
      {/* <Flex borderWidth={1} flexGrow={1} borderRightRadius="md" h="20" justifyContent="center" alignItems="center">
        <SimpleLink href="" newTab>
          <HStack>
            <Icon as={TagIcon} width={6} height={6} />
            <Text>Explore by UAT Keywords</Text>
          </HStack>
        </SimpleLink>
      </Flex> */}
    </Flex>
  );
};
