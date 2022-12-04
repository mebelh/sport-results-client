import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React, { memo } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/all';
import { Wrapper, ButtonWrapper, Title } from './style';
import { IProps } from './interfaces';

const NavigationBar: React.FC<IProps> = ({ title, goBackHandler }) => {
  const { routing } = rootStore;
  const goBack = () => {
    if (goBackHandler) {
      goBackHandler();
      return;
    }
    routing.goBack();
  };

  return (
    <Wrapper>
      <ButtonWrapper onClick={goBack}>
        <AiOutlineArrowLeft />
        <p>Назад</p>
      </ButtonWrapper>
      {title && <Title>{title}</Title>}
    </Wrapper>
  );
};

export default memo(observer(NavigationBar));
