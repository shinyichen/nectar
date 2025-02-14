import AdsApi, { IADSApiMetricsParams, IDocsEntity, IUserData } from '@api';
import { BasicStatsKey, CitationsStatsKey, IADSApiMetricsResponse, MetricsResponseKey } from '@api/lib/metrics/types';
import { metatagsQueryFields } from '@components';
import { abstractPageNavDefaultQueryFields } from '@components/AbstractSideNav/model';
import { fetchHasGraphics, fetchHasMetrics } from '@components/AbstractSideNav/queries';
import { AbsLayout } from '@components/Layout/AbsLayout';
import { Metrics } from '@components/Metrics';
import { normalizeURLParams } from '@utils';
import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';

interface IMetricsPageProps {
  originalDoc: IDocsEntity;
  error?: string;
  metrics: IADSApiMetricsResponse;
}

const MetricsPage: NextPage<IMetricsPageProps> = (props: IMetricsPageProps) => {
  const { originalDoc, error, metrics } = props;

  const hasCitations =
    metrics && metrics[MetricsResponseKey.CITATION_STATS][CitationsStatsKey.TOTAL_NUMBER_OF_CITATIONS] > 0;

  const hasReads = metrics && metrics[MetricsResponseKey.BASIC_STATS][BasicStatsKey.TOTAL_NUMBER_OF_READS] > 0;

  return (
    <AbsLayout doc={originalDoc}>
      <article aria-labelledby="title" className="mx-0 my-10 px-4 w-full bg-white md:mx-2">
        <div className="pb-1">
          <h2 className="prose-xl text-gray-900 font-medium leading-8" id="title">
            <span>Metrics for </span> <div className="text-2xl">{originalDoc.title}</div>
          </h2>
        </div>
        {error ? (
          <div className="flex items-center justify-center w-full h-full text-xl">{error}</div>
        ) : hasCitations || hasReads ? (
          <Metrics metrics={metrics} isAbstract={true} />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-xl">{'No metrics data'}</div>
        )}
      </article>
    </AbsLayout>
  );
};

export default MetricsPage;

export const getServerSideProps: GetServerSideProps<IMetricsPageProps> = async (ctx) => {
  const query = normalizeURLParams(ctx.query);
  const request = ctx.req as typeof ctx.req & {
    session: { userData: IUserData };
  };
  const userData = request.session.userData;
  const params: IADSApiMetricsParams = {
    bibcode: query.id,
  };
  const adsapi = new AdsApi({ token: userData.access_token });

  const result = await adsapi.metrics.query(params);
  const originalDoc = await adsapi.search.getDocument(query.id, [
    ...abstractPageNavDefaultQueryFields,
    ...metatagsQueryFields,
  ]);

  const queryClient = new QueryClient();
  if (!originalDoc.notFound && !originalDoc.error) {
    const { bibcode } = originalDoc.doc;
    void (await queryClient.prefetchQuery(['hasGraphics', bibcode], () => fetchHasGraphics(adsapi, bibcode)));
    void (await queryClient.prefetchQuery(['hasMetrics', bibcode], () => fetchHasMetrics(adsapi, bibcode)));
  }

  return originalDoc.notFound || originalDoc.error
    ? { notFound: true }
    : result.isErr()
    ? {
        props: {
          originalDoc: originalDoc.doc,
          dehydratedState: dehydrate(queryClient),
          error: 'Unable to get results',
          metrics: null,
        },
      }
    : {
        props: {
          originalDoc: originalDoc.doc,
          dehydratedState: dehydrate(queryClient),
          metrics: result.value,
        },
      };
};
