export type SolrField =
  | 'abstract'
  | 'ack'
  | 'aff'
  | 'aff_id'
  | 'alternate_bibcode'
  | 'alternate_title'
  | 'arxiv_class'
  | 'author'
  | 'author_count'
  | 'author_facet'
  | 'author_facet_hier'
  | 'author_norm'
  | 'bibcode'
  | 'bibgroup'
  | 'bibgroup_facet'
  | 'bibstem'
  | 'bibstem_facet'
  | 'body'
  | 'citation'
  | 'citation_count'
  | 'cite_read_boost'
  | 'classic_factor'
  | 'comment'
  | 'copyright'
  | 'data'
  | 'data_facet'
  | 'database'
  | 'date'
  | 'doctype'
  | 'doctype_facet_hier'
  | 'doi'
  | 'eid'
  | 'email'
  | 'entdate'
  | 'entry_date'
  | 'esources'
  | 'facility'
  | 'first_author'
  | 'first_author_facet_hier'
  | 'first_author_norm'
  | 'grant'
  | 'grant_agencies'
  | 'grant_facet_hier'
  | 'grant_id'
  | 'id'
  | 'identifier'
  | 'ids_data'
  | 'indexstamp'
  | 'inst'
  | 'isbn'
  | 'issn'
  | 'issue'
  | 'keyword'
  | 'keyword_facet'
  | 'keyword_norm'
  | 'keyword_schema'
  | 'lang'
  | 'links_data'
  | 'nedid'
  | 'nedtype'
  | 'nedtype_object_facet_hier'
  | 'orcid_other'
  | 'orcid_pub'
  | 'orcid_user'
  | 'page'
  | 'page_count'
  | 'page_range'
  | 'property'
  | 'pub'
  | 'pub_raw'
  | 'pubdate'
  | 'pubnote'
  | 'read_count'
  | 'reader'
  | 'recid'
  | 'reference'
  | 'simbad_object_facet_hier'
  | 'simbid'
  | 'simbtype'
  | 'thesis'
  | 'title'
  | 'vizier'
  | 'vizier_facet'
  | 'volume'
  | 'year'
  | 'abs'
  | 'all'
  | 'arxiv'
  | 'citations()'
  | 'classic_relevance()'
  | 'full'
  | 'orcid'
  | 'pos()'
  | 'references()'
  | 'reviews()'
  | 'similar()'
  | 'topn()'
  | 'trending()'
  | 'useful()'
  | string;

export type SolrSortDirection = 'desc' | 'asc';
export type SolrSortField =
  | 'author_count'
  | 'bibcode'
  | 'citation_count'
  | 'citation_count_norm'
  | 'classic_factor'
  | 'first_author'
  | 'date'
  | 'entry_date'
  | 'read_count'
  | 'score';
export type SolrSort = `${SolrSortField} ${SolrSortDirection}`;

export enum ApiTargets {
  BOOTSTRAP = '/accounts/bootstrap',
  SEARCH = 'search/query',
  QTREE = 'search/qtree',
  BIGQUERY = 'search/bigquery',
  EXPORT = 'export',
  SERVICE_AUTHOR_NETWORK = 'vis/author-network',
  SERVICE_PAPER_NETWORK = 'vis/paper-network',
  SERVICE_WORDCLOUD = 'vis/word-cloud',
  SERVICE_METRICS = 'metrics',
  SERVICE_OBJECTS = 'objects',
  SERVICE_OBJECTS_QUERY = 'objects/query',
  SERVICE_CITATION_HELPER = 'citation_helper',
  SERVICE_AUTHOR_AFFILIATION_EXPORT = 'authoraff',
  MYADS_STORAGE = 'vault',
  MYADS_NOTIFICATIONS = 'vault/_notifications',
  AUTHOR_AFFILIATION_SEARCH = 'author-affiliation/search',
  AUTHOR_AFFILIATION_EXPORT = 'author-affiliation/export',
  RESOLVER = 'resolver',
  CSRF = 'accounts/csrf',
  USER = 'accounts/user',
  USER_DATA = 'vault/user-data',
  SITE_CONFIGURATION = 'vault/configuration',
  TOKEN = 'accounts/token',
  LOGOUT = 'accounts/logout',
  REGISTER = 'accounts/register',
  VERIFY = 'accounts/verify',
  DELETE = 'accounts/user/delete',
  RESET_PASSWORD = 'accounts/reset-password',
  CHANGE_PASSWORD = 'accounts/change-password',
  CHANGE_EMAIL = 'accounts/change-email',
  RECOMMENDER = 'recommender',
  GRAPHICS = 'graphics',
  FEEDBACK = 'feedback/slack',
  LIBRARY_IMPORT_CLASSIC_AUTH = 'harbour/auth/classic',
  LIBRARY_IMPORT_CLASSIC_MIRRORS = 'harbour/mirrors',
  LIBRARY_IMPORT_CLASSIC_TO_BBB = 'biblib/classic',
  LIBRARY_IMPORT_ADS2_AUTH = 'harbour/auth/twopointoh',
  LIBRARY_IMPORT_ADS2_TO_BBB = 'biblib/twopointoh',
  LIBRARY_IMPORT_ZOTERO = 'harbour/export/twopointoh/zotero',
  LIBRARY_IMPORT_MENDELEY = 'harbour/export/twopointoh/mendeley',
  LIBRARY_IMPORT_CREDENTIALS = 'harbour/user',
  ORCID_PREFERENCES = 'orcid/preferences',
  ORCID_NAME = 'orcid/orcid-name',
  LIBRARIES = 'biblib/libraries',
  LIBRARY_TRANSFER = 'biblib/transfer',
  DOCUMENTS = 'biblib/documents',
  PERMISSIONS = 'biblib/permissions',
  REFERENCE = 'reference/text',
}
