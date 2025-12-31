/**
 * Minimal Theme
 *
 * Clean, simple design with no animations.
 * Best for: Professional apps, content-focused UIs
 */

// Core
export { Button } from './core/Button';
export { Card } from './core/Card';
export { Spacer } from './core/Spacer';
export { Text } from './core/Text';

// Form
export { Checkbox } from './form/Checkbox';

// Overlays
export { BottomSheetModal } from './overlays/BottomSheetModal';
export { ConfirmModal, DeleteConfirmModal } from './overlays/ConfirmModal';
export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonListItem,
  SkeletonList,
} from './overlays/Skeleton';

// Shared
export { CollapsibleCard } from './shared/CollapsibleCard';
export {
  SwipeableCard,
  SwipeableCardProvider,
  useSwipeableContext,
} from './shared/SwipeableCard';
export { Avatar, AvatarImage, AvatarWithName } from './shared/Avatar';

// Icons
export { default as CloseIcon } from './icons/CloseIcon';
export { default as ArrowDownIcon } from './icons/ArrowDownIcon';
