export interface ISnake {
  title?: string;
  description?: string;
  type: TSnakeType;
  id: string;
}

export type TSnakeType = 'success' | 'warning' | 'error';

export type TCreateSnakeProps = Omit<ISnake, 'id'>;

export type TEmitSnake = Omit<ISnake, 'type' | 'id'>;
