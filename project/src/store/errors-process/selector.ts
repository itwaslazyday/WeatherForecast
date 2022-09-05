import { NameSpace } from 'const/enums';
import { State } from 'types/state';

export const getWeatherDataError = (state: State): boolean => state[NameSpace.Errors].weatherDataError;
