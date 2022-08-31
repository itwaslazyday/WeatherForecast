import { NameSpace } from 'const';
import { State } from 'types/state';
import { WeatherCard } from 'types/card';

export const getWeatherCards = (state: State): WeatherCard[] => state[NameSpace.Data].weatherCards;
