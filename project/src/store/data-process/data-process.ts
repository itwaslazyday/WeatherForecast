import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const';
import { DataProcess } from 'types/state';
import { removeWeather } from 'store/action';
import { FakeCityType, makeFakeWeatherCard } from 'utils/mocks';

const initialState: DataProcess = {
  weatherCards: [makeFakeWeatherCard(FakeCityType[1]), makeFakeWeatherCard(FakeCityType[2])]
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
