import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from 'const';
import { weatherData } from './data-process/data-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: weatherData.reducer,
});
