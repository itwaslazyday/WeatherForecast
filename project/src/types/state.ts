import { WeatherCard } from './card';
import { store } from 'store/index.js';

export type DataProcess = {
  weatherCards: WeatherCard[];
  cityRepeatId: undefined | number;
}

export type ErrorsProcess = {
  weatherDataError: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
