type TScope = 'background' | 'text' | 'lightGray';

type TVariant = 'primary' | 'accent' | 'error';

const colors: {
  [scopeKey in TScope]: {
    [variantKey in TVariant]?: string;
  };
} = {
  background: {
    accent: 'var(--text-)',
    primary: 'var(--background-primary-light)',
  },
  text: {
    primary: 'var(--text-primary-light)',
    accent: '',
    error: 'var(--text-error-light)',
  },
  lightGray: {
    primary: 'var(--light-gray-light)',
  },
};

export default function getColor(scope: TScope, variant: TVariant) {
  return colors[scope][variant];
}
