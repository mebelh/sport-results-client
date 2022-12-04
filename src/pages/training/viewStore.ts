import { Form } from 'app/form';
import { RootStore } from 'dal/root-store';

export class TrainingStore {
  private readonly rootStore: RootStore;

  form = new Form<any>({}, {}, {});

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
}
