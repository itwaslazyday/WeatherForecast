import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const';
import { DataProcess } from 'types/state';
import { removeWeather } from 'store/action';
import {makeFakeWeatherCard} from 'utils/mocks';

const initialState: DataProcess = {
  weatherCards: new Array(2).fill(null).map(() => makeFakeWeatherCard())
};

export const weatherData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(fetchWeatherAction.pending, (state, action) => {
      //   state.weatherCards.push(action.payload);
      // })
      .addCase(removeWeather, (state, action) => {
        state.weatherCards.filter((card) => card.city.id === action.payload);
      });
  }
});
