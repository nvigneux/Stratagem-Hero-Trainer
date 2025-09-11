import { useMemo, useState } from 'react';
import {
  offset, flip, shift, useClick, useDismiss, autoUpdate, useFloating,
  useRole, useInteractions,
} from '@floating-ui/react';

/**
 * @typedef {object} PopoverOptions
 * @property {boolean} [initialOpen=false] - Initial open state
 * @property {import('@floating-ui/react').Placement} [placement='bottom'] - Popover placement
 * @property {boolean} [modal] - Whether the popover is modal
 * @property {boolean} [open] - Controlled open state
 * @property {(open: boolean) => void} [onOpenChange] - Controlled open change handler
 */

/**
 * @typedef {object} UsePopoverReturn
 * @property {boolean} open - Whether the popover is open
 * @property {(open: boolean) => void} setOpen - Function to set open state
 * @property {import('@floating-ui/react').FloatingContext} context - Floating UI context
 * @property {object} refs - Floating UI refs object
 * @property {import('@floating-ui/react').MiddlewareData} middlewareData - Floating UI middleware data
 * @property {import('@floating-ui/react').Placement} placement - Resolved placement
 * @property {import('@floating-ui/react').Strategy} strategy - Positioning strategy
 * @property {number} x - X coordinate
 * @property {number} y - Y coordinate
 * @property {boolean} isPositioned - Whether the floating element is positioned
 * @property {Function} getReferenceProps - Props for reference element
 * @property {Function} getFloatingProps - Props for floating element
 * @property {Function} getItemProps - Props for item elements
 * @property {boolean} [modal] - Whether the popover is modal
 * @property {string} [labelId] - ID for the label element
 * @property {string} [descriptionId] - ID for the description element
 * @property {(id: string) => void} setLabelId - Function to set label ID
 * @property {(id: string) => void} setDescriptionId - Function to set description ID
 */

/**
 * Hook for creating popover functionality with Floating UI
 * @param {PopoverOptions} props - Popover configuration options
 * @returns {UsePopoverReturn} Popover state and handlers
 */
function usePopover({
  initialOpen = false,
  placement = 'bottom',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState(/** @type {string | undefined} */ (undefined));
  const [descriptionId, setDescriptionId] = useState(/** @type {string | undefined} */ (undefined));

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: (openChange) => setOpen(openChange),
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'end',
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const { context } = data;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId],
  );
}

export default usePopover;
