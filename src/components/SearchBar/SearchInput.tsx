import { ArrowPathIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { ControllerStateAndHelpers } from 'downshift';
import PT from 'prop-types';
import { forwardRef, KeyboardEvent, useEffect, useState } from 'react';
import { TypeaheadOption } from './types';

export interface ISearchInputProps extends ControllerStateAndHelpers<TypeaheadOption> {
  isLoading: boolean;
  handleClear: () => void;
}

const defaultProps = {
  isLoading: false,
};
const propTypes = {
  isLoading: PT.bool,
};

export const SearchInput = forwardRef<HTMLInputElement, ISearchInputProps>((props, ref) => {
  const { isLoading, getInputProps, inputValue, closeMenu, handleClear } = props;
  const [showClearBtn, setShowClearBtn] = useState(typeof inputValue === 'string' ? inputValue.length > 0 : false);

  useEffect(() => setShowClearBtn(typeof inputValue === 'string' ? inputValue.length > 0 : false), [inputValue]);

  // close the menu if we happen to be loading
  useEffect(() => {
    if (isLoading) {
      closeMenu();
    }
  }, [isLoading]);

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // by default, downshift captures home/end, prevent that here
    if (e.key === 'Home' || e.key === 'End') {
      (e.nativeEvent as typeof e.nativeEvent & { preventDownshiftDefault: boolean }).preventDownshiftDefault = true;
    }
  };

  return (
    <div className="flex mt-1 rounded-md shadow-sm">
      <div className="relative focus-within:z-10 flex flex-grow items-stretch">
        <input
          type="text"
          name="q"
          {...getInputProps({
            onKeyDown: handleInputKeyDown,
          })}
          ref={ref}
          className="block pl-2 w-full border-r-0 focus:border-r-2 border-gray-300 focus:border-indigo-500 rounded-l-md rounded-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Search"
          data-testid="searchbar-input"
        />
        {showClearBtn && (
          <button
            type="button"
            data-testid="searchbar-clear-btn"
            onClick={handleClear}
            className="flex-end px-2 py-2 text-lg border-b border-t border-gray-300"
          >
            <span className="sr-only">clear input</span>
            <XMarkIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>
      <button
        data-testid="searchbar-submit-btn"
        className="relative inline-flex items-center px-4 py-2 text-sm font-medium hover:bg-blue-500 bg-blue-600 border focus:border-blue-500 border-blue-600 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {isLoading ? (
          <>
            <span className="sr-only">Loading</span>
            <div className="animate-spin">
              <ArrowPathIcon className="w-5 h-5 text-white" transform="scale (-1, 1)" transform-origin="center" />
            </div>
          </>
        ) : (
          <>
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="w-5 h-5 text-white" aria-hidden="true" />
          </>
        )}
      </button>
    </div>
  );
});
SearchInput.defaultProps = defaultProps;
SearchInput.propTypes = propTypes;
