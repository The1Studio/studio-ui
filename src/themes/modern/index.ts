/**
 * Modern Theme
 *
 * Extends minimal theme with animations and spring physics.
 * Requires: react-native-reanimated
 * Best for: Consumer apps, engaging UIs
 *
 * Components are inherited from minimal unless overridden here.
 */

// Re-export everything from minimal as base
export * from '../minimal';

// Override with animated versions (these take precedence)
export { Button } from './Button';
