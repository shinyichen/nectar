import AdsApi, { IADSApiSearchParams, IDocsEntity, IUserData } from '@api';
import { GetServerSideProps, NextPage } from 'next';
import { AbsLayout } from '@components/Layout/AbsLayout';
import { normalizeURLParams } from '@utils';
import { abstractPageNavDefaultQueryFields } from '@components/AbstractSideNav/model';
import { metatagsQueryFields, SimpleResultList } from '@components';
import { dehydrate, QueryClient } from 'react-query';
import { fetchHasGraphics, fetchHasMetrics } from '@components/AbstractSideNav/queries';
import { useRouter } from 'next/router';
import Link from 'next/link';
import qs from 'qs';

interface IVolumePageProps {
  originalDoc: IDocsEntity;
  docs: IDocsEntity[];
  numFound: number;
  error?: string;
}

const getQueryParams = (id: string | string[]): IADSApiSearchParams => {
  const idStr = Array.isArray(id) ? id[0] : id;
  const vol = getVolumeId(idStr);
  return {
    q: `bibcode:${vol}`,
    fl: [
      'bibcode',
      'title',
      'author',
      '[fields author=10]',
      'author_count',
      'pubdate',
      'bibstem',
      'citation_count',
      '[citations]',
      'esources',
      'property',
      'data',
    ],
    sort: ['date desc'],
  };
};

const getVolumeId = (id: string): string => {
  return id[13] === 'E' ? `${id.substring(0, 14)}*` : `${id.substring(0, 13)}*`;
};

const VolumePage: NextPage<IVolumePageProps> = (props: IVolumePageProps) => {
  const { originalDoc, docs, numFound, error } = props;

  const { query } = useRouter();

  const volumeId = getVolumeId(originalDoc.bibcode);

  return (
    <AbsLayout doc={originalDoc}>
      <article aria-labelledby="title" className="mx-0 my-10 px-4 w-full bg-white md:mx-2">
        <div className="pb-1">
          <h2 className="prose-xl text-gray-900 font-medium leading-8" id="title">
            <span>Papers in the same volume as</span> <div className="text-2xl">{originalDoc.title}</div>
          </h2>
        </div>
        {error ? (
          <div className="flex items-center justify-center w-full h-full text-xl">{error}</div>
        ) : (
          <>
            <Link
              href={`/search?${qs.stringify({
                q: `bibcode:${volumeId}`,
                sort: 'date desc',
              })}`}
            >
              <a className="link text-sm">View as search results</a>
            </Link>
            <SimpleResultList query={getQueryParams(query.id)} numFound={numFound} docs={docs} hideCheckboxes={true} />
          </>
        )}
      </article>
    </AbsLayout>
  );
};

export default VolumePage;

export const getServerSideProps: GetServerSideProps<IVolumePageProps> = async (ctx) => {
  const query = normalizeURLParams(ctx.query);
  const request = ctx.req as typeof ctx.req & {
    session: { userData: IUserData };
  };
  const userData = request.session.userData;
  const adsapi = new AdsApi({ token: userData.access_token });
  const mainResult = await adsapi.search.query(getQueryParams(query.id));
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

  if (originalDoc.notFound || originalDoc.error) {
    return { notFound: true };
  }

  const defaultProps = {
    docs: [],
    originalDoc: originalDoc.doc,
    numFound: 0,
    dehydratedState: dehydrate(queryClient),
  };

  if (mainResult.isErr()) {
    return {
      props: {
        ...defaultProps,
        error: 'Unable to get results',
      },
    };
  }

  const { numFound, docs } = mainResult.value.response;

  return numFound === 0
    ? {
        props: {
          ...defaultProps,
          error: 'No results found',
        },
      }
    : {
        props: {
          ...defaultProps,
          docs,
          numFound,
        },
      };
};
