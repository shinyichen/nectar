import { IADSApiSearchParams, useSearch, useVaultBigQuerySearch } from '@api';
import { IADSApiVisNode, IBibcodeDict } from '@api/vis/types';
import { useGetAuthorNetwork } from '@api/vis/vis';
import { Box, Button, SimpleGrid, Stack, Text, useToast } from '@chakra-ui/react';
import {
  INodeDetails,
  NetworkDetailsPane,
  Expandable,
  SimpleLink,
  StandardAlertMessage,
  LoadingMessage,
  CustomInfoMessage,
} from '@components';
import { ITagItem, Tags } from '@components/Tags';
import { makeSearchParams } from '@utils';
import axios from 'axios';
import { decode } from 'he';
import { useRouter } from 'next/router';
import { countBy, reverse, sortBy, uniq } from 'ramda';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { IView, NetworkGraphPane } from '../GraphPanes';
import { ILineGraph } from '../types';
import { getAuthorNetworkSummaryGraph } from '../utils';
import { NotEnoughData } from '../NotEnoughData';

interface IAuthorNetworkPageContainerProps {
  query: IADSApiSearchParams;
}

const DEFAULT_ROWS_TO_FETCH = 400;

const MAX_ROWS_TO_FETCH = 1000;

// views and corresponding graph value to use
const views: IView[] = [
  { id: 'author_occurrences', label: 'Author Occurrences', valueToUse: 'size' },
  { id: 'paper_citations', label: 'Paper Citations', valueToUse: 'citation_count' },
  { id: 'paper_downloads', label: 'Paper Downloads', valueToUse: 'read_count' },
];

export const AuthorNetworkPageContainer = ({ query }: IAuthorNetworkPageContainerProps): ReactElement => {
  const router = useRouter();

  const toast = useToast();

  const [rowsToFetch, setRowsToFetch] = useState(DEFAULT_ROWS_TO_FETCH);

  // User selected graph node (group, author)
  const [selected, setSelected] = useState<INodeDetails>(null);

  // Selected filters (group, author)
  const [filters, setFilters] = useState<INodeDetails[]>([]);

  // fetch bibcodes of query
  const {
    data: bibsQueryResponse,
    isLoading: bibsQueryIsLoading,
    isError: bibsQueryIsError,
    error: bibsQueryError,
  } = useSearch(
    { ...query, fl: ['bibcode'], rows: rowsToFetch },
    { enabled: !!query && !!query.q && query.q.length > 0 },
  );

  // tranform query data to a list of bibcodes
  const bibcodes = useMemo(() => {
    return bibsQueryResponse ? bibsQueryResponse.docs.map((d) => d.bibcode) : [];
  }, [bibsQueryResponse]);

  const numFound = useMemo(() => {
    return bibsQueryResponse ? bibsQueryResponse.numFound : 0;
  }, [bibsQueryResponse]);

  // fetch author network data when bibcodes are available
  const {
    data: authorNetworkData,
    isLoading: authorNetworkIsLoading,
    isSuccess: authorNetworkIsSuccess,
    isError: authorNetworkIsError,
    error: authorNetworkError,
  } = useGetAuthorNetwork(bibcodes, { enabled: bibcodes && bibcodes.length > 0 });

  // author network data to summary graph
  const authorNetworkSummaryGraph: ILineGraph = useMemo(() => {
    if (authorNetworkData) {
      return getAuthorNetworkSummaryGraph(authorNetworkData);
    }
  }, [authorNetworkData]);

  // convert filters to tags
  const filterTagItems: ITagItem[] = useMemo(() => {
    return filters.map((node) => ({
      id: node.name,
      label: node.name,
    }));
  }, [filters]);

  // when filtered search is applied, trigger big query
  const [applyingBibcodes, setApplyingBibcodes] = useState<string[]>([]);
  const { data: bigQueryData, error: bigQueryError } = useVaultBigQuerySearch(applyingBibcodes, {
    enabled: applyingBibcodes.length > 0,
  });

  useEffect(() => {
    if (authorNetworkData) {
      setRowsToFetch(Math.min(numFound, rowsToFetch));
    }
  }, [authorNetworkData]);

  // When big query data is fetched, redirect to the search results page
  useEffect(() => {
    if (bigQueryData && applyingBibcodes.length > 0) {
      void router.push({ pathname: '/search', search: makeSearchParams({ q: `docs(${bigQueryData.qid})` }) });
      setApplyingBibcodes([]);
    }

    if (bigQueryError) {
      toast({
        status: 'error',
        title: 'Error!',
        description: 'Error fetching filtered results',
      });
      setApplyingBibcodes([]);
    }
  }, [bigQueryData, bigQueryError, applyingBibcodes]);

  // Callback Handlers

  const handleGraphNodeClick = (node: IADSApiVisNode) => {
    const bibcode_dict = authorNetworkData.data.bibcode_dict;
    setSelected(getNodeDetails(node, bibcode_dict));
  };

  const handleAddFilter = (node: INodeDetails) => {
    setFilters(uniq([...filters, node]));
  };

  const handleRemoveFilter = (node: INodeDetails) => {
    setFilters(filters.filter((f) => f.name !== node.name));
  };

  const handleRemoveFilterTag = (filterTagItem: ITagItem) => {
    setFilters(filters.filter((filter) => filter.name !== filterTagItem.id));
  };

  const handleClearFiltersTags = () => {
    setFilters([]);
  };

  const handleChangePaperLimit = (limit: number) => {
    if (limit <= MAX_ROWS_TO_FETCH && limit <= numFound) {
      setRowsToFetch(limit);
    }
  };

  // get all papers (bibcodes) of the filter groups and authors and trigger big query search
  const handleApplyFilters = () => {
    const bibcodes = uniq(
      filters.reduce(
        (acc, node) => [...acc, ...node.papers.reduce((acc1, paper) => [...acc1, paper.bibcode], [] as string[])],
        [] as string[],
      ), // filters to a list of papers
    );

    // This will trigger big query and redirect
    setApplyingBibcodes(bibcodes);
  };

  return (
    <Box as="section" aria-label="Author network graph" my={10}>
      <StatusDisplay
        bibsQueryIsError={bibsQueryIsError}
        authorNetworkIsError={authorNetworkIsError}
        bibsQueryIsLoading={bibsQueryIsLoading}
        bibsQueryError={bibsQueryError}
        authorNetworkIsLoading={authorNetworkIsLoading}
        authorNetworkError={authorNetworkError}
      />
      {!authorNetworkIsLoading && authorNetworkIsSuccess && !authorNetworkData.data?.root && (
        <CustomInfoMessage status="info" title="Could not generate" description={<NotEnoughData />} />
      )}
      {!authorNetworkIsLoading && authorNetworkIsSuccess && authorNetworkData.data?.root && (
        <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={16}>
          <Box>
            <Expandable
              title="About Author Network"
              description={
                <>
                  This network visualization finds groups of authors within your search results. You can click on the
                  segments to view the papers connected with a group or a particular author.
                  <SimpleLink href="/help/actions/visualize#author-network" newTab>
                    Learn more about author network
                  </SimpleLink>
                </>
              }
            />
            <NetworkGraphPane
              root={authorNetworkData.data.root}
              link_data={authorNetworkData.data.link_data}
              views={views}
              onClickNode={handleGraphNodeClick}
              onChangePaperLimit={handleChangePaperLimit}
              paperLimit={rowsToFetch}
              maxPaperLimit={Math.min(numFound, MAX_ROWS_TO_FETCH)}
            />
          </Box>
          <Box>
            <FilterSearchBar
              tagItems={filterTagItems}
              onRemove={handleRemoveFilterTag}
              onClear={handleClearFiltersTags}
              onApply={handleApplyFilters}
            />
            <NetworkDetailsPane
              summaryGraph={authorNetworkSummaryGraph}
              node={selected}
              onAddToFilter={handleAddFilter}
              onRemoveFromFilter={handleRemoveFilter}
              canAddAsFilter={filters.findIndex((f) => f.name === selected.name) === -1}
            />
          </Box>
        </SimpleGrid>
      )}
    </Box>
  );
};

const StatusDisplay = ({
  bibsQueryIsError,
  authorNetworkIsError,
  bibsQueryIsLoading,
  bibsQueryError,
  authorNetworkIsLoading,
  authorNetworkError,
}: {
  bibsQueryIsError: boolean;
  authorNetworkIsError: boolean;
  bibsQueryIsLoading: boolean;
  bibsQueryError: unknown;
  authorNetworkIsLoading: boolean;
  authorNetworkError: unknown;
}): ReactElement => {
  return (
    <>
      {bibsQueryIsError && (
        <StandardAlertMessage
          status="error"
          title="Error fetching records!"
          description={axios.isAxiosError(bibsQueryError) && bibsQueryError.message}
        />
      )}
      {authorNetworkIsError && (
        <StandardAlertMessage
          status="error"
          title="Error fetching author network data!"
          description={axios.isAxiosError(authorNetworkError) && authorNetworkError.message}
        />
      )}
      {bibsQueryIsLoading && <LoadingMessage message="Fetching records" />}
      {authorNetworkIsLoading && <LoadingMessage message="Fetching author network data" />}
    </>
  );
};

const FilterSearchBar = ({
  tagItems,
  onRemove,
  onClear,
  onApply,
}: {
  tagItems: ITagItem[];
  onRemove: (tagItem: ITagItem) => void;
  onClear: () => void;
  onApply: () => void;
}): ReactElement => {
  return (
    <Stack direction="column" mb={10}>
      <Text fontWeight="bold">Filter current search: </Text>
      <Text>Narrow down your search results to papers from a certain group or author</Text>
      <Tags
        tagItems={tagItems}
        onRemove={onRemove}
        onClear={onClear}
        placeHolder="select an author or a group in the visualization and click the 'add to filter' button"
        flex={1}
      />
      <Button onClick={onApply}>Search</Button>
    </Stack>
  );
};

// Get individual node details
const getNodeDetails = (node: IADSApiVisNode, bibcode_dict: IBibcodeDict): INodeDetails => {
  // if selected an author node
  if (!('children' in node)) {
    const bibcodes = uniq(node.papers);

    // get author's papers details
    const papers = bibcodes.map((bibcode) => ({
      ...bibcode_dict[bibcode],
      bibcode,
      title: Array.isArray(bibcode_dict[bibcode].title)
        ? decode(bibcode_dict[bibcode].title[0])
        : decode(bibcode_dict[bibcode].title as string),
    }));

    // sort by citation count
    papers.sort((p1, p2) => {
      return p2.citation_count - p1.citation_count;
    });

    // most recent year
    const mostRecentYear = bibcodes
      .sort((b1, b2) => {
        return parseInt(b1.slice(0, 4)) - parseInt(b2.slice(0, 4));
      })
      [bibcodes.length - 1].slice(0, 4);

    return { name: node.name as string, type: 'author', papers, mostRecentYear };
  }
  // if selected a group node
  else {
    // all bibcodes in this group, has duplicates
    const allBibcodes = node.children.reduce((prev, current) => [...prev, ...current.papers], [] as string[]);

    // bibcode: author count
    const authorCount = countBy((a) => a, allBibcodes);

    // all bibcodes w/o duplicates
    const bibcodes = Object.keys(authorCount);

    // get min and max authors
    const numAuthors = Object.values(authorCount).sort();
    const minNumAuthors = numAuthors[0];
    const maxNumAuthors = numAuthors[numAuthors.length - 1];

    // min max percent authors in the group
    const percentAuthors = Object.entries(authorCount)
      .map(([bibcode, aCount]) => aCount / bibcode_dict[bibcode].authors.length)
      .sort();
    const minPercentAuthors = percentAuthors[0];
    const maxPercentAuthors = percentAuthors[percentAuthors.length - 1];

    // min max citations
    const numCitations = bibcodes
      .map((bibcode) => bibcode_dict[bibcode].citation_count / bibcode_dict[bibcode].authors.length)
      .sort();
    const minNumCitations = numCitations[0];
    const maxNumCitations = numCitations[numCitations.length - 1];

    // most recent year
    const mostRecentYear = bibcodes
      .sort((b1, b2) => {
        return parseInt(b1.slice(0, 4)) - parseInt(b2.slice(0, 4));
      })
      [bibcodes.length - 1].slice(0, 4);

    let papers = bibcodes.map((bibcode) => ({
      ...bibcode_dict[bibcode],
      bibcode,
      title: Array.isArray(bibcode_dict[bibcode].title)
        ? decode(bibcode_dict[bibcode].title[0])
        : decode(bibcode_dict[bibcode].title as string),
      groupAuthorCount: authorCount[bibcode],
    }));

    // sort paper
    // from https://github.com/adsabs/bumblebee/blob/752b9146a404de2cfefebf55cb0cc983907f7519/src/js/widgets/network_vis/network_widget.js#L701
    papers = reverse(
      sortBy(({ bibcode }) => {
        return (
          (((((authorCount[bibcode] - minNumAuthors) / (maxNumAuthors - minNumAuthors)) *
            (authorCount[bibcode] / bibcode_dict[bibcode].authors.length - minPercentAuthors)) /
            (maxPercentAuthors - minPercentAuthors)) *
            (bibcode_dict[bibcode].citation_count / bibcode_dict[bibcode].authors.length - minNumCitations)) /
          (maxNumCitations - minNumCitations)
        );
      }, papers),
    );

    return { name: `Group ${node.name as string}`, type: 'group', papers, mostRecentYear };
  }
};
