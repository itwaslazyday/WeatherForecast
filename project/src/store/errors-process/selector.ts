import {NameSpace} from 'const';
import {State} from 'types/state';

export const getWeatherDataError = (state: State): boolean => state[NameSpace.Errors].weatherDataError;
