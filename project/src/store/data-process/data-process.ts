import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const';
import { fetchWeatherAction } from 'store/api-actions';
import { DataProcess } from 'types/state';
import { makeFakeWeatherCard } from 'utils/mocks';

const initialState: DataProcess = {
  weatherCards: []
};

export const weatherData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    removeWeather: (state, action) => {
      state.weatherCards.filter((card) => card.city.id === action.payload);
    },
    // updateWeatherCards: (state, action) => {
    //   drag and drop
    // }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherAction.fulfilled, (state, action) => {
        state.weatherCards.push(action.payload);
      })
      .addCase(fetchWeatherAction.rejected, (state, action) => {
        console.log('data error');
      });
  }
});
