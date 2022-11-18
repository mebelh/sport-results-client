import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/all';
import { Wrapper, ButtonWrapper, Title } from './style';
import { IProps } from './interfaces';

const NavigationBar: React.FC<IProps> = ({ title }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
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

export default memo(NavigationBar);
