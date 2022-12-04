import { API } from 'app/api';
import { DalAuthStore } from 'dal/auth';
import { makeAutoObservable } from 'mobx';
import { DalUserStore } from 'dal/user';
import { DalUIStore } from 'dal/ui';
import { DalEquipmentStore } from 'dal/equipment';
import { DalExercisesStore } from 'dal/exercise';
import { EquipmentStore } from 'pages/equipment/viewStore';
import { ExercisesStore } from 'pages/exercises/viewStore';
import { RoutingStore } from 'app/routing/store';
import { DalWorkoutStore } from 'dal/workout';
import { CreateWorkoutStore } from 'pages/createWorkout/viewStore';
import { ResultsStore } from 'pages/results/viewStore';
import { WorkoutListPageStore } from 'pages/workoutList/viewStore';
import { DalResultsStore } from './results';

export class RootStore {
  dalUserStore: DalUserStore;

  dalAuthStore: DalAuthStore;

  API: API;

  dalUIStore: DalUIStore;

  dalEquipmentStore: DalEquipmentStore;

  dalExercisesStore: DalExercisesStore;

  dalWorkoutStore: DalWorkoutStore;

  dalResultsStore: DalResultsStore;

  equipmentStore: EquipmentStore;

  exercisesStore: ExercisesStore;

  createWorkoutStore: CreateWorkoutStore;

  workoutListStore: WorkoutListPageStore;

  resultsStore: ResultsStore;

  routing: RoutingStore;

  constructor() {
    makeAutoObservable(this);
    this.dalUserStore = new DalUserStore(this);
    this.dalAuthStore = new DalAuthStore(this);
    this.dalExercisesStore = new DalExercisesStore(this);
    this.API = new API(this);
    this.dalUIStore = new DalUIStore(this);
    this.dalEquipmentStore = new DalEquipmentStore(this);
    this.equipmentStore = new EquipmentStore(this);
    this.exercisesStore = new ExercisesStore(this);
    this.dalWorkoutStore = new DalWorkoutStore(this);
    this.createWorkoutStore = new CreateWorkoutStore(this);
    this.workoutListStore = new WorkoutListPageStore(this);
    this.routing = new RoutingStore();
    this.dalResultsStore = new DalResultsStore(this);
    this.resultsStore = new ResultsStore(this);
  }
}

export const rootStore = new RootStore();
