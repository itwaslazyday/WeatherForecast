import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const/enums';
import { fetchWeatherAction } from 'store/api-actions';
import { DataProcess } from 'types/state';

const initialState: DataProcess = {
  weatherCards: [],
};

export const weatherData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    removeWeatherCard: (state, action) => {
      state.weatherCards.filter((card) => card.city.id !== action.payload);
    },
    updateWeatherCards: (state, action) => {
      state.weatherCards = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherAction.fulfilled, (state, action) => {
        state.weatherCards.push({...action.payload, order: state.weatherCards.length});
      });
  }
});

export const { removeWeatherCard, updateWeatherCards } = weatherData.actions;
