import { SolrSort } from '@api';

export type LogicChoice = 'and' | 'or' | 'boolean';
export type CollectionChoice = 'astronomy' | 'physics' | 'general';
export type PropertyChoice = 'refereed-only' | 'articles-only';

export interface IClassicFormState {
  limit: CollectionChoice[];
  author: string;
  logic_author: LogicChoice;
  object: string;
  logic_object: LogicChoice;
  pubdate_start: string;
  pubdate_end: string;
  title: string;
  logic_title: LogicChoice;
  abstract_keywords: string;
  logic_abstract_keywords: LogicChoice;
  property: PropertyChoice[];
  bibstems: string[];
  sort: SolrSort[];
}
