import { IDocsEntity } from '@api';
import type {} from '@heroicons/react/outline';
import {
  ChartPieIcon,
  ClipboardListIcon,
  CollectionIcon,
  DocumentTextIcon,
  DownloadIcon,
  DuplicateIcon,
  PhotographIcon,
  TableIcon,
  UsersIcon,
} from '@heroicons/react/solid';

export enum Routes {
  ABSTRACT = 'abstract',
  CITATIONS = 'citations',
  REFERENCES = 'references',
  COREADS = 'coreads',
  SIMILAR = 'similar',
  VOLUMECONTENT = 'toc',
  GRAPHICS = 'graphics',
  METRICS = 'metrics',
  EXPORT = 'exportcitation',
}

export const navigation = [
  {
    name: 'Abstract',
    enable: true,
    href: Routes.ABSTRACT,
    count: 0,
    icon: DocumentTextIcon,
  },
  {
    name: 'Citations',
    enable: true,
    href: Routes.CITATIONS,
    count: 0,
    icon: CollectionIcon,
  },
  {
    name: 'References',
    enable: true,
    href: Routes.REFERENCES,
    count: 0,
    icon: ClipboardListIcon,
  },
  {
    name: 'Co-Reads',
    enable: true,
    href: Routes.COREADS,
    count: 0,
    icon: UsersIcon,
  },
  {
    name: 'Similar Papers',
    enable: true,
    href: Routes.SIMILAR,
    count: 0,
    icon: DuplicateIcon,
  },
  {
    name: 'Volume Content',
    enable: true,
    href: Routes.VOLUMECONTENT,
    count: 0,
    icon: TableIcon,
  },
  {
    name: 'Graphics',
    enable: true,
    href: Routes.GRAPHICS,
    count: 0,
    icon: PhotographIcon,
  },
  {
    name: 'Metrics',
    enable: true,
    href: Routes.METRICS,
    count: 0,
    icon: ChartPieIcon,
  },
  {
    name: 'Export Citation',
    enable: true,
    href: Routes.EXPORT,
    count: 0,
    icon: DownloadIcon,
  },
];

export const abstractPageNavDefaultQueryFields: Partial<keyof IDocsEntity>[] = [
  'citation_count',
  '[citations]',
  'read_count',
  'abstract',
  'property',
];
