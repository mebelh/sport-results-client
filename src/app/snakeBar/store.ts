import { makeAutoObservable } from 'mobx';
import { Snake } from './snake';
import { TCreateSnakeProps, TEmitSnake } from './interfaces';

let snakeIdx = 0;

export class SnakeBarStore {
  snakes: Snake[];

  snakeLifetime: number;

  constructor() {
    this.snakes = [];
    this.snakeLifetime = 5000;
    makeAutoObservable(this);
  }

  // eslint-disable-next-line class-methods-use-this
  killSnake(snake: Snake) {
    snake.kill();
  }

  private emit(createSnakeProps: TCreateSnakeProps) {
    const snake = new Snake(
      {
        ...createSnakeProps,
        id: `snake-${snakeIdx}`,
      },
      this
    );
    this.snakes.push(snake);
    snakeIdx += 1;

    return () => {
      this.killSnake(snake);
    };
  }

  emitSuccess(props: TEmitSnake) {
    this.emit({
      ...props,
      type: 'success',
    });
  }

  emitWarning(props: TEmitSnake) {
    this.emit({
      ...props,
      type: 'warning',
    });
  }

  emitError(props: TEmitSnake) {
    this.emit({
      ...props,
      type: 'error',
    });
  }
}

export const snakeBar = new SnakeBarStore();
