import { IDocsEntity } from '@api';
import { DatabaseIcon, DocumentTextIcon, ViewListIcon } from '@heroicons/react/outline';
import { getFomattedNumericPubdate } from '@utils';
import { useMachine } from '@xstate/react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ReactElement } from 'react';
import { IAbstractPreviewProps } from './AbstractPreview';
import { itemMachine, ItemMachine } from './machine/item';

const AbstractPreview = dynamic<IAbstractPreviewProps>(
  () => import('./AbstractPreview').then((mod) => mod.AbstractPreview),
  { ssr: false },
);

interface IItemProps {
  doc: IDocsEntity;
  index: number;
  hideCheckbox: boolean;
  set?: boolean;
  clear?: boolean;
  onSet?: (check: boolean) => void;
}

export const Item = (props: IItemProps): ReactElement => {
  const { doc, index, hideCheckbox = false, set, clear, onSet } = props;
  const { bibcode, pubdate, title = ['Untitled'], author = [], id, citation, bibstem = [] } = doc;
  const [state, send] = useMachine(itemMachine.withContext({ id }), {
    devTools: true,
  });

  const formattedPubDate = getFomattedNumericPubdate(pubdate);
  const [formattedBibstem] = bibstem;

  if ((set && state.matches('unselected')) || (clear && state.matches('selected'))) {
    send({ type: ItemMachine.TransitionTypes.TOGGLE_SELECT });
  }

  const handleSelect = () => {
    state.matches('selected') ? onSet(false) : onSet(true);
    send({ type: ItemMachine.TransitionTypes.TOGGLE_SELECT });
  };

  const checkBgClass = clsx(
    state.matches('selected') ? 'bg-blue-600' : 'bg-gray-100',
    'flex items-center justify-center mr-3 px-2 rounded-bl-md rounded-tl-md',
  );

  const indexClass = clsx(
    state.matches('selected') ? 'text-white' : '',
    'hidden items-center justify-center mr-3 md:flex',
  );

  return (
    <article className="flex bg-white border rounded-md shadow" aria-labelledby={`result-${id}`}>
      <div className={checkBgClass}>
        <div className={indexClass}>{index}</div>
        {hideCheckbox ? null : (
          <input
            type="checkbox"
            name={`result-checkbox-${index}`}
            id={`result-checkbox-${index}`}
            onChange={handleSelect}
            checked={state.matches('selected')}
            aria-label={title[0]}
          />
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between pr-2 py-2">
          <Link href={`/abs/${bibcode}`}>
            <a className="text-blue-700 hover:underline">
              <h3 className="text-lg" id={`result-${id}`} dangerouslySetInnerHTML={{ __html: title[0] }}></h3>
            </a>
          </Link>
          <div className="flex items-start">
            <button title="Full text sources" tabIndex={0}>
              <DocumentTextIcon className="default-icon default-link-color" />
            </button>
            <button title="Citations and references" tabIndex={0}>
              <ViewListIcon className="default-icon default-link-color" />
            </button>
            <button title="Data" tabIndex={0}>
              <DatabaseIcon className="default-icon default-link-color" />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          {author.length > 0 && <div className="text-s">{author.slice(0, 3).join('; ')}</div>}
          <div className="flex py-1">
            <span className="text-xs">
              {formattedPubDate}
              {formattedPubDate && formattedBibstem ? ' | ' : ''}
              {formattedBibstem}
            </span>
            {citation && <span className="text-xs">cite: {citation}</span>}
          </div>
          <AbstractPreview id={id} />
        </div>
      </div>
    </article>
  );
};
