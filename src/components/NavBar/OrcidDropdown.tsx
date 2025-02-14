import { OrcidInactiveLogo } from '@components';
import { ListType } from '@components/Dropdown/types';
import { ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { ReactElement } from 'react';
import { CollapsibleList, DropdownList } from '../Dropdown';
import styles from './NavBar.module.css';

interface IOrcidDropdownProps {
  type: ListType;
  reset: boolean;
  onFinished: () => void;
}

const items = [
  {
    id: 'login',
    domId: 'orcid-login',
    label: 'Sign into Orcid to claim papers in ADS',
  },
];

export const OrcidDropdown = (props: IOrcidDropdownProps): ReactElement => {
  const { type, reset, onFinished } = props;

  const handleSelect = (id: string) => {
    if (id === 'login') {
      handleOrcidSignIn();
      onFinished();
    }
  };

  const handleOnClose = () => {
    onFinished();
  };

  const handleOrcidSignIn = () => {
    console.log('orcid sign in ');
  };

  const getOrcidLabelNode = () => {
    return (
      <>
        <OrcidInactiveLogo width="18px" height="18px" aria-hidden className="flex-shrink-0" />
        <span>&nbsp;ORCiD</span>
        <ChevronDownIcon className="inline w-4 h-4" aria-hidden="true" />
      </>
    );
  };

  return type === ListType.DROPDOWN ? (
    <DropdownList
      label={getOrcidLabelNode()}
      items={items}
      onSelect={handleSelect}
      classes={{
        button: 'text-gray-300 hover:text-white focus:text-white flex justify-center items-center',
        list: '',
      }}
      offset={[-60, 12]}
      role={{ label: 'menu', item: 'menuitem' }}
      ariaLabel="Orcid"
    />
  ) : (
    <CollapsibleList
      label={getOrcidLabelNode()}
      items={items}
      onSelect={handleSelect}
      onEscaped={handleOnClose}
      classes={{
        button: clsx(
          styles['navbar-text-color'],
          styles['navbar-bg-color'],
          'flex items-center justify-start py-4 text-left hover:text-white focus:text-white',
        ),
        item: clsx(styles['navbar-text-color'], 'hover:text-white focus:text-white'),
      }}
      role={{ label: 'menu', item: 'menuitem' }}
      reset={reset}
      ariaLabel="Orcid"
    />
  );
};
