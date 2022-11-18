import React from 'react';
import { observer } from 'mobx-react-lite';
import { snakeBar } from './store';
import {
  Wrapper,
  SnakeWrapper,
  CleanButton,
  Title,
  Description,
} from './style';

const SnakeBarWrapper: React.FC = () => (
  <Wrapper>
    {snakeBar.snakes.map((snake, index) => (
      <SnakeWrapper
        key={snake.id}
        isKilled={snake.isKilled}
        type={snake.type}
        index={index}
      >
        <Title>{snake.title}</Title>
        <Description>{snake.description}</Description>
        <CleanButton
          isKilled={snake.isKilled}
          onClick={() => {
            snake.kill();
          }}
        />
      </SnakeWrapper>
    ))}
  </Wrapper>
);

export default observer(SnakeBarWrapper);
