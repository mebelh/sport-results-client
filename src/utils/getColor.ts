type TScope = 'background' | 'text' | 'lightGray';

type TVariant = 'primary' | 'accent' | 'error' | 'danger';

const colors: {
  [scopeKey in TScope]: {
    [variantKey in TVariant]?: string;
  };
} = {
  background: {
    accent: 'var(--background-accent)',
    primary: 'var(--background-primary)',
    danger: 'var(--background-danger)',
  },
  text: {
    primary: 'var(--text-primary)',
    accent: 'var(--text-accent)',
    error: 'var(--text-error)',
  },
  lightGray: {
    primary: 'var(--light-gray)',
    danger: 'var(--light-gray-danger)',
  },
};

export default function getColor(scope: TScope, variant: TVariant) {
  return colors[scope][variant];
}
