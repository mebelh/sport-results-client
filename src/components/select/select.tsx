import React, { useRef, useState } from 'react';
import useOnClickOutside from 'utils/hooks/useOnClickOutside';
import { TValue } from 'app/form/interfaces';
import { TSelectProps, TSelectElementProps, IPosition } from './interfaces';

import {
  Value,
  Wrapper,
  Title,
  ElementsWrapper,
  ElementWrapper,
  Placeholder,
  Error,
} from './style';

const SelectElement: React.FC<TSelectElementProps> = ({
  label,
  onSelect,
  isSelected,
}) => (
  <ElementWrapper onClick={onSelect} isSelected={isSelected}>
    {label}
  </ElementWrapper>
);

const Select: React.FC<TSelectProps> = ({
  icon,
  value,
  onChange,
  title,
  error,
  elements,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<string>('');
  const [cords, setCords] = useState<IPosition | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((v) => !v);
  };

  const localeValue = value ?? state;
  const label = elements.find((e) => e.value === localeValue)?.label;

  const handleChange = (newValue: string) => {
    setState(newValue);
    onChange?.(newValue, localeValue);
    close();
  };

  const onValueClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!valueRef.current) {
      return;
    }

    if (!cords) {
      const { x, y, height, width } = valueRef.current.getBoundingClientRect();

      setCords({
        x,
        y: y + height,
        width,
      });
    }

    toggle();
  };

  const isSelected = (v: TValue): boolean => localeValue === v;

  useOnClickOutside(wrapperRef, close);

  return (
    <Wrapper ref={wrapperRef}>
      {title && <Title>{title}</Title>}
      {icon && <div>{icon}</div>}
      <Value
        onClick={onValueClick}
        isOpen={isOpen}
        ref={valueRef}
        error={error}
      >
        {label}
        {!label && <Placeholder>{placeholder}</Placeholder>}
      </Value>
      {isOpen && (
        <ElementsWrapper
          cords={cords}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {elements.map((element) => (
            <SelectElement
              key={element.value}
              isSelected={isSelected(element.value)}
              label={element.label}
              onSelect={() => handleChange(element.value)}
            />
          ))}
        </ElementsWrapper>
      )}
      <Error>{error}</Error>
    </Wrapper>
  );
};

export default Select;
