import { makeAutoObservable } from 'mobx';
import { TEmitSnake } from 'app/snakeBar/interfaces';
import { snakeBar } from './store';

class SnakeBarEmitter {
  private readonly snakeBar = snakeBar;

  constructor() {
    makeAutoObservable(this);
  }

  emitSuccess(props: TEmitSnake) {
    this.snakeBar.emitSuccess(props);
  }

  emitWarning(props: TEmitSnake) {
    this.snakeBar.emitWarning(props);
  }

  emitError(props: TEmitSnake) {
    this.snakeBar.emitError(props);
  }
}

export const snakeBarEmitter = new SnakeBarEmitter();
