type TScope = 'background' | 'text' | 'lightGray';

export type TColorVariant =
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'error'
  | 'danger'
  | 'transparentPrimary'
  | 'transparentAccent';

const colors: {
  [scopeKey in TScope]: {
    [variantKey in TColorVariant]?: string;
  };
} = {
  background: {
    accent: 'var(--background-accent)',
    primary: 'var(--background-primary)',
    danger: 'var(--background-danger)',
    transparentPrimary: 'var(--background-transparent-primary)',
    transparentAccent: 'var(--background-transparent-accent)',
  },
  text: {
    primary: 'var(--text-primary)',
    accent: 'var(--text-accent)',
    error: 'var(--text-error)',
    secondary: 'var(--text-secondary)',
  },
  lightGray: {
    primary: 'var(--light-gray)',
    danger: 'var(--light-gray-danger)',
  },
};

export default function getColor(scope: TScope, variant: TColorVariant) {
  return colors[scope][variant];
}
