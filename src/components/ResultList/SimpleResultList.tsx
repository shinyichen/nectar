import { Flex, VisuallyHidden } from '@chakra-ui/react';
import { useIsClient } from '@/lib/useIsClient';
import PT from 'prop-types';
import { HTMLAttributes, ReactElement, useMemo } from 'react';
import { Item } from './Item';
import { useHighlights } from './useHighlights';
import { IDocsEntity } from '@/api/search/types';
import { useGetExportCitation } from '@/api/export/export';
import { useSettings } from '@/lib/useSettings';
import { ExportApiFormatKey, ExportResponseOutputFormat } from '@/api/export/types';
import { exportFormats } from '../CitationExporter';
import { groupBy } from 'ramda';

export interface ISimpleResultListProps extends HTMLAttributes<HTMLDivElement> {
  docs: IDocsEntity[];
  indexStart?: number;
  hideCheckboxes?: boolean;
  showOrcidAction?: boolean;
  hideActions?: boolean;
  allowHighlight?: boolean;
  useNormCite?: boolean;
}

const propTypes = {
  docs: PT.arrayOf(PT.object),
  indexStart: PT.number,
  hideCheckboxes: PT.bool,
};

export const SimpleResultList = (props: ISimpleResultListProps): ReactElement => {
  const {
    docs = [],
    hideCheckboxes = false,
    indexStart = 0,
    hideActions = false,
    allowHighlight = true,
    useNormCite = false,
    ...divProps
  } = props;

  const isClient = useIsClient();
  const start = indexStart + 1;

  const { highlights, showHighlights, isFetchingHighlights } = useHighlights();

  const { settings } = useSettings();
  const { defaultExportFormat, customFormats } = settings;

  const bibcodes = docs.map((d) => d.bibcode).sort();

  const { data: citationData } = useGetExportCitation(
    {
      // format: values(exportFormats).find((f) => f.label === defaultExportFormat).id,
      format: ExportApiFormatKey.agu,
      customFormat: defaultExportFormat === exportFormats.custom.label ? customFormats[0].code : undefined,
      bibcode: bibcodes,
      outputformat: ExportResponseOutputFormat.INDIVIDUAL,
    },
    { enabled: !!settings?.defaultExportFormat },
  );

  // a map from bibcode to citation
  const defaultCitations = useMemo(() => {
    if (!!citationData?.docs) {
      return groupBy<{ bibcode: string; reference: string }>((doc) => doc.bibcode, citationData.docs);
    } else {
      return {};
    }
  }, [citationData]);

  return (
    <Flex
      as="section"
      aria-label="Results"
      direction="column"
      aria-labelledby="results-title"
      id="results"
      {...divProps}
    >
      <VisuallyHidden as="h2" id="results-title">
        Results
      </VisuallyHidden>
      {docs.map((doc, index) => (
        <Item
          doc={doc}
          key={doc.bibcode}
          index={start + index}
          hideCheckbox={!isClient ? true : hideCheckboxes}
          hideActions={hideActions}
          showHighlights={allowHighlight && showHighlights}
          highlights={highlights?.[index] ?? []}
          isFetchingHighlights={allowHighlight && isFetchingHighlights}
          useNormCite={useNormCite}
          defaultCitation={defaultCitations?.[doc.bibcode]?.[0]?.reference}
        />
      ))}
    </Flex>
  );
};
SimpleResultList.propTypes = propTypes;
