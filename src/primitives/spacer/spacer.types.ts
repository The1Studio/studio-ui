export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface SpacerProps {
  size?: SpacerSize | number;
  horizontal?: boolean;
}
