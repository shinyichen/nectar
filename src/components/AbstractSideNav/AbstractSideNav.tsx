import { IDocsEntity, useHasGraphics, useHasMetrics } from '@api';
import { Button } from '@chakra-ui/button';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Badge, Box, Flex, Link, Stack, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { SimpleLinkList } from '@components';
import { ItemType } from '@components/Dropdown/types';
import {
  ChartPieIcon,
  ClipboardListIcon,
  CollectionIcon,
  DocumentIcon,
  DocumentTextIcon,
  DownloadIcon,
  DuplicateIcon,
  PhotographIcon,
  TableIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { useIsClient } from '@hooks/useIsClient';
import { noop, parseQueryFromUrl } from '@utils';
import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, HTMLAttributes, ReactElement } from 'react';
import { Routes } from './model';

const useGetItems = ({
  doc,
  hasMetrics,
  hasGraphics,
}: {
  doc: IDocsEntity;
  hasMetrics: boolean;
  hasGraphics: boolean;
}) => {
  const router = useRouter();

  const items: Record<
    Routes,
    {
      route: string;
      label: string;
      icon: ReactElement;
      count?: number;
      disabled?: boolean;
      linkProps?: (id: string) => LinkProps;
      active?: boolean;
    }
  > = {
    [Routes.ABSTRACT]: {
      route: Routes.ABSTRACT,
      label: 'Abstract',
      icon: <DocumentTextIcon />,
    },
    [Routes.CITATIONS]: {
      route: Routes.CITATIONS,
      label: 'Citations',
      icon: <CollectionIcon />,
      count: doc?.citation_count ?? 0,
    },
    [Routes.REFERENCES]: {
      route: Routes.REFERENCES,
      label: 'References',
      icon: <ClipboardListIcon />,
      count: doc['[citations]']?.num_references ?? 0,
    },
    [Routes.COREADS]: {
      route: Routes.COREADS,
      label: 'Co-Reads',
      icon: <UsersIcon />,
      count: doc?.read_count ?? 0,
    },
    [Routes.SIMILAR]: {
      route: Routes.SIMILAR,
      label: 'Similar Papers',
      icon: <DuplicateIcon />,
      disabled: !doc?.abstract,
    },
    [Routes.VOLUMECONTENT]: {
      route: Routes.VOLUMECONTENT,
      label: 'Volume Content',
      icon: <TableIcon />,
      disabled: doc.property?.indexOf('TOC') > -1,
    },
    [Routes.GRAPHICS]: {
      route: Routes.GRAPHICS,
      label: 'Graphics',
      icon: <PhotographIcon />,
      disabled: !hasGraphics,
    },
    [Routes.METRICS]: {
      route: Routes.METRICS,
      label: 'Metrics',
      icon: <ChartPieIcon />,
      disabled: !hasMetrics,
    },
    [Routes.EXPORT]: {
      route: Routes.EXPORT,
      label: 'Export Citation',
      icon: <DownloadIcon />,
      linkProps: (docId) => ({
        href: `/abs/[id]/${Routes.EXPORT}/[format]`,
        as: `/abs/${docId}/${Routes.EXPORT}/bibtex`,
      }),
    },
  };

  return {
    items,
    activeItem: Object.keys(items).find((route) => router.asPath.indexOf(`/${route}`) > -1) as Routes,
  };
};
export interface IAbstractSideNavProps extends HTMLAttributes<HTMLDivElement> {
  doc?: IDocsEntity;
}

export const AbstractSideNav = (props: IAbstractSideNavProps): ReactElement => {
  const isClient = useIsClient();
  return isClient ? <Component {...props} /> : <Static {...props} />;
};

const Component = (props: IAbstractSideNavProps): ReactElement => {
  const { doc } = props;
  const hasGraphics = useHasGraphics(doc.bibcode);
  const hasMetrics = useHasMetrics(doc.bibcode);
  const { items, activeItem } = useGetItems({ doc, hasGraphics, hasMetrics });

  return (
    <>
      {/* Large viewports */}
      <Box as="nav" aria-label="sidebar" display={{ base: 'none', lg: 'initial' }}>
        <Flex direction="column" alignItems="start" justifyContent="start" shadow="md" borderRadius="md" p={2}>
          {Object.values(items).map((itemProps) => (
            <Item key={itemProps.route} {...itemProps} />
          ))}
        </Flex>
      </Box>

      {/* Small viewports */}
      <Box as="nav" display={{ base: 'initial', lg: 'none' }}>
        <Menu matchWidth>
          <MenuButton width="full">
            <TopMenuButton {...items[activeItem]} />
          </MenuButton>
          <MenuList>
            {Object.values(items).map((itemProps) => (
              <TopMenuItem key={itemProps.route} {...itemProps} />
            ))}
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};

interface IItemProps {
  disabled?: boolean;
  label: string;
  count?: number;
  route: string;
  icon: ReactElement;
  linkProps?: (id: string) => LinkProps;
}
const Item = (props: IItemProps) => {
  const { disabled = false, label, count, route, icon = <DocumentIcon />, linkProps = noop } = props;
  const router = useRouter();

  let isDisabled = disabled;
  if (typeof count === 'number' && count <= 0) {
    isDisabled = true;
  }

  const { id: docId } = parseQueryFromUrl<{ id: string }>(router.query);
  const active = router.asPath.indexOf(`/${route}`) > -1;

  return (
    <NextLink href={`/abs/[id]/${route}`} as={`/abs/${docId}/${route}`} passHref {...linkProps(docId)}>
      <Link variant="dropdownItem" w="full" tabIndex={-1}>
        <Button
          variant={active ? 'solid' : 'ghost'}
          size="md"
          aria-current={active ? 'page' : undefined}
          isDisabled={isDisabled}
          width="full"
          justifyContent="start"
          colorScheme="gray"
          mb={1}
          className="flex-shi"
          leftIcon={cloneElement(icon, { className: 'w-6 h-6', ariaHidden: true })}
        >
          {label}
        </Button>
      </Link>
    </NextLink>
  );
};

const TopMenuItem = (props: IItemProps) => {
  const { disabled = false, label, count, route, icon = <DocumentIcon />, linkProps = noop } = props;
  const router = useRouter();

  let isDisabled = disabled;
  if (typeof count === 'number' && count <= 0) {
    isDisabled = true;
  }

  const active = router.asPath.indexOf(`/${route}`) > -1;
  const { id: docId } = parseQueryFromUrl<{ id: string }>(router.query);

  return (
    <MenuItem isDisabled={isDisabled} backgroundColor={active ? 'gray.100' : 'transparent'} mb={1}>
      <NextLink href={`/abs/[id]/${route}`} as={`/abs/${docId}/${route}`} passHref {...linkProps(docId)}>
        <Box width="full">
          <Stack direction="row" alignItems="center">
            {cloneElement(icon, { className: 'mr-3 w-6 h-6', ariaHidden: true })}
            <Text fontWeight="normal">{label}</Text>
            <CountBadge count={count} />
          </Stack>
        </Box>
      </NextLink>
    </MenuItem>
  );
};

const TopMenuButton = (props: IItemProps) => {
  const { label, count, icon } = props;
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="gray.50"
      borderRadius="md"
      px={3}
      py={2}
      width="full"
    >
      <Flex direction="row" width="full">
        {cloneElement(icon, { className: 'mr-3 w-6 h-6', ariaHidden: true })}
        <Text>{label}</Text>
        <CountBadge count={count} />
      </Flex>
      <ChevronDownIcon className="w-6 h-6" />
    </Flex>
  );
};

const CountBadge = ({ count }: { count: number }): ReactElement => {
  if (typeof count !== 'number') {
    return null;
  }
  return (
    <Badge
      mx={3}
      py={1}
      fontSize="xs"
      fontWeight="normal"
      borderRadius="xl"
      colorScheme="gray"
      px={2}
      backgroundColor="gray.50"
    >
      {count}
    </Badge>
  );
};

const Static = (props: IAbstractSideNavProps) => {
  const { doc } = props;
  const hasGraphics = useHasGraphics(doc.bibcode);
  const hasMetrics = useHasMetrics(doc.bibcode);
  const { items, activeItem } = useGetItems({ doc, hasGraphics, hasMetrics });
  const getSimpleItems = (): ItemType[] => {
    const res = Object.values(items).map((item) => ({
      id: item.route,
      label: (
        <>
          <Stack direction="row" alignItems="center">
            {cloneElement(item.icon, { className: 'mr-3 w-6 h-6', ariaHidden: true })}
            <Text fontWeight="normal">{item.label}</Text>
            <CountBadge count={item.count} />
          </Stack>
        </>
      ),

      // TODO: need to refactor this so it supports dynamic routes (i.e. linkProps)
      path:
        item.route === Routes.EXPORT ? `/abs/${doc.bibcode}/${item.route}/bibtex` : `/abs/${doc.bibcode}/${item.route}`,
      disabled: item.disabled,
    }));
    return res;
  };

  return (
    <>
      {/* Large viewports */}
      <Box as="nav" aria-label="sidebar" display={{ base: 'none', lg: 'initial' }}>
        <Flex direction="column" alignItems="start" justifyContent="start" shadow="md" borderRadius="md" p={2}>
          {Object.values(items).map((itemProps) => (
            <Item key={itemProps.route} {...itemProps} />
          ))}
        </Flex>
      </Box>

      {/* Small viewports */}
      <Box as="nav" display={{ base: 'initial', lg: 'none' }}>
        <SimpleLinkList items={getSimpleItems()} minWidth="full" selected={activeItem} label="Abstract Navigation" />
      </Box>
    </>
  );
};
