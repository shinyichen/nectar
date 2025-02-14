import { isBrowser } from '@utils';
import clsx from 'clsx';
import { ReactElement, ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';

export interface IPopoverProps {
  label: ReactNode;
  title: string;
  message: string;
  classes?: string;
}

export const Popover = (props: IPopoverProps): ReactElement => {
  const { label, title, message, classes, ...restProps } = props;

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  const popperClasses = clsx('z-50 p-2 w-52 bg-white border', classes, {
    hidden: !visible,
  });

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <>
      {isBrowser() ? (
        <button ref={setReferenceElement} onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {label}
        </button>
      ) : (
        <span title={message}>{label}</span>
      )}

      <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className={popperClasses} {...restProps}>
        <strong>{title}</strong>
        <div dangerouslySetInnerHTML={{ __html: message }}></div>
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </>
  );
};
