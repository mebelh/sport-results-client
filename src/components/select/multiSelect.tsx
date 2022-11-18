import React, { memo, useRef, useState } from 'react';
import useOnClickOutside from 'utils/hooks/useOnClickOutside';
import { TValue } from 'app/form/interfaces';
import { MdOutlineCancel } from 'react-icons/all';
import {
  TMultiSelectProps,
  TSelectElementProps,
  IPosition,
} from './interfaces';

import {
  Value,
  Wrapper,
  Title,
  ElementsWrapper,
  ElementWrapper,
  Placeholder,
  Error,
  Label,
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

const MultiSelect: React.FC<TMultiSelectProps> = ({
  icon,
  value,
  onChange,
  title,
  error,
  elements,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<TValue[]>([]);
  const [cords, setCords] = useState<IPosition | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((v) => !v);
  };

  const valuesMap: {
    [key: string]: string;
  } = elements.reduce(
    (acc, e) => ({
      ...acc,
      [e.value]: e.label,
    }),
    {}
  );

  const localeValue: TValue[] = value ?? state;

  const label = localeValue.map((v) => (
    <Label key={String(v)}>
      <MdOutlineCancel
        onClick={(e) => {
          e.stopPropagation();

          handleChange(v);
        }}
      />

      {valuesMap[v as string]}
    </Label>
  ));

  const syncCords = () => {
    if (valueRef.current) {
      const { x, y, height, width } = valueRef.current.getBoundingClientRect();

      setCords(() => ({
        x,
        y: y + height,
        width,
      }));
    }
  };

  const handleChange = (newValue: TValue) => {
    const newValues = ~localeValue.indexOf(newValue)
      ? localeValue.filter((v) => v !== newValue)
      : [...localeValue, newValue];

    onChange?.(newValues, localeValue);

    setTimeout(() => {
      syncCords();
    });

    if (!value) {
      setState((values) => {
        const newValues2 = ~values.indexOf(newValue)
          ? values.filter((v) => v !== newValue)
          : [...values, newValue];

        onChange?.(newValues2, localeValue);

        return newValues2;
      });
    }
  };

  const isSelected = (v: TValue): boolean =>
    Boolean(localeValue.find((val) => val === v));

  const onValueClick: React.MouseEventHandler<HTMLDivElement> = () => {
    syncCords();

    toggle();
  };

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
        {!label.length && <Placeholder>{placeholder}</Placeholder>}
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
              isSelected={isSelected(element.value)}
              key={element.label + element.value}
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

export default MultiSelect;
