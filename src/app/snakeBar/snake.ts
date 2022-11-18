import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { SnakeBarStore } from 'app/snakeBar/store';
import { TSnakeType, ISnake } from './interfaces';

export class Snake {
  snakeStore: SnakeBarStore;

  title?: string;

  description?: string;

  type: TSnakeType;

  id: string;

  isKilled: boolean;

  constructor(
    { description, title, type, id }: ISnake,
    snakeStore: Snake['snakeStore']
  ) {
    this.title = title;
    this.description = description;
    this.type = type;
    this.id = id;
    this.isKilled = true;
    this.snakeStore = snakeStore;

    makeAutoObservable(this);

    setTimeout(() => {
      this.setKill(false);
    }, 300);

    setTimeout(() => {
      this.kill();
    }, this.snakeStore.snakeLifetime);
  }

  private setKill(kill: boolean) {
    this.isKilled = kill;
  }

  kill() {
    this.isKilled = true;

    setTimeout(() => {
      this.snakeStore.snakes = this.snakeStore.snakes.filter((s) => s !== this);
    }, 300);
  }
}
