import { createContext, useContext } from 'react';
import usePopover from './usePopover';

const PopoverContext = createContext(null);

export const usePopoverContext = () => {
  const context = useContext(PopoverContext);

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }

  return context;
};

/**
 * @param {PopoverOptions & {
 *   children: React.ReactNode;
 *   modal?: boolean;
 *   initialOpen?: boolean;
 *   placement?: import('@floating-ui/react').Placement;
 *   open?: boolean;
 *   onOpenChange?: (open: boolean) => void;
 *   labelId?: string | undefined;
 *   descriptionId?: string | undefined;
 *   setLabelId?: (labelId: string | undefined) => void;
 *   setDescriptionId?: (descriptionId: string | undefined) => void;
 * }} props
 * @returns {React.ReactNode}
 */
export function Popover({
  children,
  modal = false,
  ...restOptions
}) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
}
