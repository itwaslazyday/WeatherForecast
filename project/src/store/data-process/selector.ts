import { NameSpace } from '../../const/enums';
import { State } from 'types/state';
import { WeatherCard } from 'types/card';

const getWeatherCards = (state: State): WeatherCard[] => state[NameSpace.Data].weatherCards;
const getCityRepeatId = (state: State): number | undefined => state[NameSpace.Data].cityRepeatId;

export {getWeatherCards, getCityRepeatId};

