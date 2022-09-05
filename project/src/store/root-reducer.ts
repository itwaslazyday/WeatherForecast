import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from 'const/enums';
import { weatherData } from './data-process/data-process';
import { errorsProcess } from './errors-process/errors-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: weatherData.reducer,
  [NameSpace.Errors]: errorsProcess.reducer,
});
