import * as React from 'react';
import {
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  // useId,
} from '@floating-ui/react';
import { usePopoverContext } from './PopoverContext';

// Styles
import styles from './Popover.module.css';

/**
 * @param {PopoverTriggerProps & React.HTMLProps<HTMLElement>} props
 * @returns {React.ReactNode}
 */
export const PopoverTrigger = React.forwardRef(
  /**
   * @param {PopoverTriggerProps & React.HTMLProps<HTMLElement>} props
   * @param {React.Ref<HTMLElement>} propRef
   * @returns {React.ReactNode}
   */
  ({
    children,
    asChild = false,
    ...props
  }, propRef) => {
    const context = usePopoverContext();
    // @ts-ignore
    const childrenRef = (children).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...children.props,
          'data-state': context.open ? 'open' : 'closed',
        }),
      );
    }

    return (
      <button
        ref={ref}
        type="button"
      // The user can style the trigger based on the state
        data-state={context.open ? 'open' : 'closed'}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...context.getReferenceProps(props)}
      >
        {children}
      </button>
    );
  },
);

PopoverTrigger.displayName = 'PopoverTrigger';

/**
 * @param {React.HTMLProps<HTMLDivElement>} props
 * @returns {React.ReactNode}
 */
export const PopoverContent = React.forwardRef(
  /**
   * @param {React.HTMLProps<HTMLDivElement>} props
   * @param {React.Ref<HTMLDivElement>} propRef
   * @returns {React.ReactNode}
   */
  ({ style, ...props }, propRef) => {
    const { context: floatingContext, ...context } = usePopoverContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    if (!floatingContext.open) return null;

    return (
      <FloatingPortal>
        <FloatingFocusManager context={floatingContext} modal={context.modal}>
          <div
            ref={ref}
            style={{ ...context.floatingStyles, ...style }}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            className={styles['popover-content']}
          // eslint-disable-next-line react/jsx-props-no-spreading
            {...context.getFloatingProps(props)}
          >
            {props.children}
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);

PopoverContent.displayName = 'PopoverContent';
