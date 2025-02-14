import { IDocsEntity } from '@api';
import { DropdownList } from '@components';
import { ItemType } from '@components/Dropdown/types';
import { DocumentIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useViewport, Viewport } from '@hooks';
import { useBaseRouterPath } from '@utils';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { last } from 'ramda';
import { HTMLAttributes, ReactElement } from 'react';
import { navigation, Routes } from './model';
import { useHasGraphics, useHasMetrics } from './queries';

export interface IAbstractSideNavProps extends HTMLAttributes<HTMLDivElement> {
  doc?: IDocsEntity;
}

export const AbstractSideNav = ({ doc }: IAbstractSideNavProps): ReactElement => {
  const router = useRouter();
  const { basePath } = useBaseRouterPath();
  const subPage = last(basePath.split('/'));
  const viewport = useViewport();
  const hasGraphics = useHasGraphics(doc);
  const hasMetrics = useHasMetrics(doc);
  const hasToc = doc.property ? doc.property.indexOf('TOC') > -1 : false;

  const useCount = [Routes.CITATIONS, Routes.REFERENCES];

  const itemElements = navigation.map((item) => {
    const Icon = item.icon || DocumentIcon;
    const current = item.href === subPage;
    const count =
      item.href === Routes.EXPORT ||
      (item.href === Routes.GRAPHICS && hasGraphics) ||
      (item.href === Routes.METRICS && hasMetrics) ||
      (item.href === Routes.VOLUMECONTENT && hasToc)
        ? 1
        : getCount(item.href, doc);
    const disabled = count === 0 && item.href !== Routes.ABSTRACT;
    const showCount = count > 0 && useCount.includes(item.href);
    const href = { pathname: disabled ? Routes.ABSTRACT : item.href, query: { id: router.query.id } };

    const linkStyle = clsx(
      current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      'group flex items-center px-3 py-2 text-sm font-medium rounded-md',
      disabled && 'opacity-50 pointer-events-none',
    );
    const iconStyle = clsx(
      current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
      'flex-shrink-0 mr-3 w-6 h-6',
    );
    const countStyle = clsx(
      current ? 'bg-white' : 'bg-gray-100 group-hover:bg-gray-200',
      'inline-block ml-3 px-3 py-0.5 text-xs rounded-full',
    );
    return (
      <Link key={item.name} href={href}>
        <a className={linkStyle} aria-current={current ? 'page' : undefined} aria-disabled={disabled}>
          <Icon className={iconStyle} aria-hidden="true" />
          <span className="flex-1 truncate">{item.name}</span>
          {showCount ? <span className={countStyle}>{count}</span> : null}
        </a>
      </Link>
    );
  });

  const getTopMenu = () => {
    const items: ItemType[] = navigation.map((item, index) => {
      const count = getCount(item.href, doc);
      return {
        id: item.name,
        label: itemElements[index],
        domId: `absNav-${item.name}`,
        disabled: count === 0 && item.href !== Routes.ABSTRACT,
      };
    });
    const currentItem = navigation.find((item) => item.href === subPage) ?? navigation[0];
    const Icon = currentItem.icon || DocumentIcon;
    const count = getCount(currentItem.href, doc);
    const showCount = count > 0 && currentItem.href !== Routes.SIMILAR;
    const label = (
      <div className="group flex items-center mt-5 px-3 py-2 text-left text-gray-600 text-sm font-medium bg-gray-100 rounded-md">
        <Icon className="flex-shrink-0 mr-3 w-6 h-6 text-gray-500" aria-hidden="true" />
        <span className="flex-1 truncate">{currentItem.name}</span>
        {showCount ? (
          <span className="inline-block ml-3 px-3 py-0.5 text-xs bg-white rounded-full">{count}</span>
        ) : null}
        <ChevronDownIcon className="default-icon-sm" aria-hidden="true" />
      </div>
    );

    return (
      <DropdownList
        items={items}
        label={<div className="mt-5 px-3 text-left">{label}</div>}
        classes={{ button: 'w-full', list: 'w-full' }}
        placement="bottom-start"
        role={{ label: 'menu', item: 'menuitem' }}
      ></DropdownList>
    );
  };

  return (
    <>
      {viewport >= Viewport.LG ? (
        <nav className="self-start my-10 p-1 bg-white shadow space-y-1 lg:block lg:rounded-lg" aria-label="Sidebar">
          {itemElements}
        </nav>
      ) : (
        getTopMenu()
      )}
    </>
  );
};

const getCount = (route: Routes, doc: IDocsEntity) => {
  if (!doc) {
    return 0;
  }

  switch (route) {
    case Routes.CITATIONS:
      return typeof doc.citation_count === 'number' ? doc.citation_count : 0;
    case Routes.REFERENCES:
      return typeof doc['[citations]'].num_references === 'number' ? doc['[citations]'].num_references : 0;
    case Routes.COREADS:
      return typeof doc.read_count === 'number' ? doc.read_count : 0;
    case Routes.SIMILAR:
      return typeof doc.abstract !== 'undefined' ? 1 : 0;
    default:
      return 0;
  }
};
