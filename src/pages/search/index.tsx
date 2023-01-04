import {
  defaultParams,
  fetchSearch,
  getSearchParams,
  getSearchStatsParams,
  IADSApiSearchParams,
  IADSApiSearchResponse,
  searchKeys,
  SEARCH_API_KEYS,
  SolrSort,
  useSearch,
} from '@api';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Flex, List, ListIcon, ListItem, Stack } from '@chakra-ui/layout';
import { Alert, AlertIcon, Button, Code, Heading, Portal, useMediaQuery, VisuallyHidden } from '@chakra-ui/react';
import {
  CustomInfoMessage,
  ISearchFacetsProps,
  ItemsSkeleton,
  ListActions,
  NumFound,
  Pagination,
  SearchBar,
  SimpleLink,
  SimpleResultList,
} from '@components';
import { calculateStartIndex } from '@components/ResultList/Pagination/usePagination';
import { FacetFilters } from '@components/SearchFacet/FacetFilters';
import { YearHistogramSlider } from '@components/SearchFacet/YearHistogramSlider';
import { APP_DEFAULTS } from '@config';
import { useIsClient } from '@hooks';
import { AppState, createStore, useStore, useStoreApi } from '@store';
import { NumPerPageType } from '@types';
import {
  composeNextGSSP,
  isApiSearchResponse,
  makeSearchParams,
  parseQueryFromUrl,
  setupApiSSR,
  userGSSP,
} from '@utils';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { last, omit, path } from 'ramda';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { dehydrate, QueryClient, useQueryClient } from 'react-query';

const SearchFacets = dynamic<ISearchFacetsProps>(
  () => import('@components/SearchFacet').then((mod) => mod.SearchFacets),
  { ssr: false },
);

const selectors = {
  setQuery: (state: AppState) => state.setQuery,
  updateQuery: (state: AppState) => state.updateQuery,
  submitQuery: (state: AppState) => state.submitQuery,
  setNumPerPage: (state: AppState) => state.setNumPerPage,
  numPerPage: (state: AppState) => state.numPerPage,
  setDocs: (state: AppState) => state.setDocs,
  showFilters: (state: AppState) => state.settings.searchFacets.open,
  toggleSearchFacetsOpen: (state: AppState) => state.toggleSearchFacetsOpen,
};

const omitP = omit(['p']);

const SearchPage: NextPage = () => {
  const router = useRouter();

  const store = useStoreApi();
  const storeNumPerPage = useStore(selectors.numPerPage);
  const setQuery = useStore(selectors.setQuery);
  const updateQuery = useStore(selectors.updateQuery);
  const submitQuery = useStore(selectors.submitQuery);
  const setNumPerPage = useStore(selectors.setNumPerPage);
  const setDocs = useStore(selectors.setDocs);

  const queryClient = useQueryClient();
  const queries = queryClient.getQueriesData<IADSApiSearchResponse>(SEARCH_API_KEYS.primary);
  const numFound = queries.length > 1 ? path<number>(['1', 'response', 'numFound'], last(queries)) : null;

  // parse the query params from the URL, this should match what the server parsed
  const parsedParams = parseQueryFromUrl(router.asPath);
  const params = {
    ...defaultParams,
    ...parsedParams,
    rows: storeNumPerPage,
    start: calculateStartIndex(parsedParams.p, storeNumPerPage, numFound),
  };

  const { data, isSuccess, isLoading, error } = useSearch(omitP(params));

  const [isPrint] = useMediaQuery('print'); // use to hide elements when printing

  const [histogramExpanded, setHistogramExpanded] = useState(false);

  const [width, setWidth] = useState(0);

  // use this to get full width, used by histogram
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth - 20);
    }
  }, [ref]);

  const isClient = useIsClient();

  // on Sort change handler
  const handleSortChange = (sort: SolrSort[]) => {
    const query = store.getState().query;
    if (query.q.length === 0) {
      // if query is empty, do not submit search
      return;
    }

    // generate search string and trigger page transition, also update store
    const search = makeSearchParams({ ...params, ...query, sort, p: 1 });
    void router.push({ pathname: router.pathname, search }, null, { scroll: false, shallow: true });
  };

  // On submission handler
  const handleOnSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const query = store.getState().query;
    if (query.q.length === 0) {
      // if query is empty, do not submit search
      return;
    }

    // generate a URL search string and trigger a page transition, and update store
    const search = makeSearchParams({ ...params, ...query, p: 1 });
    void router.push({ pathname: router.pathname, search }, null, { scroll: false, shallow: true });
  };

  // Update the store when we have data
  useEffect(() => {
    if (data?.docs.length > 0) {
      setDocs(data.docs.map((d) => d.bibcode));
      setQuery(omitP(params));
      submitQuery();
    }
  }, [data]);

  /**
   * When updating perPage, this updates the store with both the current
   * numPerPage value and the current query
   */
  const handlePerPageChange = (numPerPage: NumPerPageType) => {
    // should reset to the first page on numPerPage update
    updateQuery({ start: 0, rows: numPerPage });
    setNumPerPage(numPerPage);
  };

  const handleSearchFacetSubmission = (queryUpdates: Partial<IADSApiSearchParams>) => {
    const search = makeSearchParams({ ...params, ...queryUpdates, p: 1 });
    void router.push({ pathname: router.pathname, search }, null, { scroll: false, shallow: true });
  };

  const handleToggleExpand = () => {
    setHistogramExpanded((prev) => !prev);
  };

  // search facet handlers

  return (
    <>
      <Head>
        <title>{params.q} | NASA Science Explorer - Search Results</title>
      </Head>
      <Stack direction="column" aria-labelledby="search-form-title" spacing="10" ref={ref}>
        <Box pt={10}>
          {isPrint || (
            <form method="get" action="/search" onSubmit={handleOnSubmit} className="print-hidden">
              <Flex direction="column" width="full">
                <SearchBar isLoading={isLoading} />
                <NumFound count={data?.numFound} isLoading={isLoading} />
              </Flex>
              <FacetFilters mt="2" />
            </form>
          )}
        </Box>
        {/* if histogram is expanded, show it below the search bar, otherwise it should be part of the facets */}
        {!isPrint && isClient && histogramExpanded && (
          <Flex justifyContent="center">
            <YearHistogramSlider
              onQueryUpdate={handleSearchFacetSubmission}
              isExpanded={histogramExpanded}
              onToggleExpand={handleToggleExpand}
              width={width}
              height={125}
            />
          </Flex>
        )}
        <Flex direction="row" gap={10}>
          <Box display={{ base: 'none', lg: 'block' }}>
            {/* hide facets if screen is too small */}
            {!isPrint && isClient && (
              <SearchFacetFilters
                showHistogram={!histogramExpanded}
                onExpandHistogram={handleToggleExpand}
                onSearchFacetSubmission={handleSearchFacetSubmission}
              />
            )}
          </Box>
          <Box flexGrow={2}>
            <Box>
              {isSuccess && !isLoading && data?.numFound > 0 && <ListActions onSortChange={handleSortChange} />}
            </Box>
            <VisuallyHidden as="h2" id="search-form-title">
              Search Results
            </VisuallyHidden>

            {!isLoading && data?.numFound === 0 && <NoResultsMsg query={params.q} />}
            {isLoading && <ItemsSkeleton count={storeNumPerPage} />}

            {data && (
              <>
                <SimpleResultList docs={data.docs} indexStart={params.start} />
                <Pagination
                  numPerPage={storeNumPerPage}
                  page={params.p}
                  totalResults={data.numFound}
                  onPerPageSelect={handlePerPageChange}
                />
              </>
            )}
            {error && (
              <Box aria-labelledby="search-form-title" my={16}>
                <SearchErrorAlert error={error} />
              </Box>
            )}
          </Box>
        </Flex>
      </Stack>
    </>
  );
};

const SearchFacetFilters = (props: {
  showHistogram: boolean;
  onExpandHistogram: () => void;
  onSearchFacetSubmission: (queryUpdates: Partial<IADSApiSearchParams>) => void;
}) => {
  const { showHistogram, onSearchFacetSubmission, onExpandHistogram } = props;
  const showFilters = useStore(selectors.showFilters);
  const handleToggleFilters = useStore(selectors.toggleSearchFacetsOpen);

  if (showFilters) {
    return (
      <Flex as="aside" aria-labelledby="search-facets" minWidth="250px" direction="column">
        <Flex>
          <Heading as="h2" id="search-facets" fontSize="normal" flex="1">
            Filters
          </Heading>
          <Button variant="link" type="button" onClick={handleToggleFilters} fontSize="normal" fontWeight="normal">
            Hide
          </Button>
        </Flex>
        {showHistogram && (
          <Flex justifyContent="center">
            <YearHistogramSlider
              onQueryUpdate={onSearchFacetSubmission}
              isExpanded={false}
              onToggleExpand={onExpandHistogram}
              width={200}
              height={125}
            />
          </Flex>
        )}
        <SearchFacets onQueryUpdate={onSearchFacetSubmission} />
      </Flex>
    );
  }
  return (
    <Box as="aside" aria-labelledby="search-facets">
      <Portal appendToParentPortal>
        <Button
          position="absolute"
          transform="rotate(90deg)"
          borderBottomRadius="none"
          size="xs"
          type="button"
          onClick={handleToggleFilters}
          top="240px"
          left="-28px"
        >
          Show Filters
        </Button>
      </Portal>
    </Box>
  );
};

const NoResultsMsg = ({ query = '' }: { query: string }) => (
  <CustomInfoMessage
    status="info"
    title={
      <>
        Sorry no results were found for <Code children={query} />
      </>
    }
    description={
      <List w="100%">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Try broadening your search
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Disable any filters that may be applied
        </ListItem>
        <ListItem>
          <Flex direction="row" alignItems="center">
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <SimpleLink href="/">Check out some examples</SimpleLink>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex direction="row" alignItems="center">
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <SimpleLink href="/help/search/search-syntax" newTab={true}>
              Read our help pages
            </SimpleLink>
          </Flex>
        </ListItem>
      </List>
    }
  />
);
export const getServerSideProps: GetServerSideProps = composeNextGSSP(async (ctx) => {
  const { p: page, ...query } = parseQueryFromUrl<{ p: string }>(ctx.req.url);

  setupApiSSR(ctx);
  const queryClient = new QueryClient();

  // prime the search with a small query to get the current numFound
  let primer = null;
  if (page > 1) {
    const primerParams = { ...query, start: 0, rows: 1, fl: ['id'] };
    primer = await queryClient.fetchQuery({
      queryKey: SEARCH_API_KEYS.primary,
      queryFn: fetchSearch,
      queryHash: JSON.stringify(searchKeys.primary(omit(['fl'], primerParams))),
      meta: { params: primerParams },
    });
  }

  const params: IADSApiSearchParams = getSearchParams({
    ...query,
    q: query.q.length === 0 ? '*:*' : query.q,
    start: calculateStartIndex(page, APP_DEFAULTS.RESULT_PER_PAGE, primer?.response.numFound),
  });

  // omit fields from queryKey
  const { fl, ...cleanedParams } = params;

  // prefetch the citation counts for this query
  if (/^citation_count(_norm)?/.test(params.sort[0])) {
    void (await queryClient.prefetchQuery({
      queryKey: searchKeys.stats(cleanedParams),
      queryFn: fetchSearch,
      meta: { params: getSearchStatsParams(params, params.sort[0]) },
    }));
  }
  const initialState = createStore().getState();

  try {
    // primary query prefetch
    const primaryResult = await queryClient.fetchQuery({
      queryKey: SEARCH_API_KEYS.primary,
      queryFn: fetchSearch,
      queryHash: JSON.stringify(searchKeys.primary(omit(['fl'], params) as IADSApiSearchParams)),
      meta: { params },
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        dehydratedAppState: {
          query: params,
          latestQuery: params,
          docs: {
            ...initialState.docs,
            current: primaryResult.response.docs.map((d) => d.bibcode),
          },
        } as AppState,
      },
    };
  } catch (e) {
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        dehydratedAppState: {
          query: params,
          latestQuery: params,
        } as AppState,
      },
    };
  }
}, userGSSP);

export default SearchPage;

const SearchErrorAlert = ({ error }: { error: unknown }) => {
  if (!error) {
    return null;
  }

  // Show a message about updating query if the it's a syntax error
  if (axios.isAxiosError(error) && error.response.status === 400 && isApiSearchResponse(error.response.data)) {
    const query = error.response.data.responseHeader.params.q;

    return (
      <Alert status="error">
        <AlertIcon />
        <Stack direction="row">
          <p>Unable to parse </p>
          <Code>{query}</Code>
          <p>please update, and try again</p>
        </Stack>
      </Alert>
    );
  }

  return (
    <Alert status="error">
      <AlertIcon />
      {axios.isAxiosError(error) && error.message}
    </Alert>
  );
};
