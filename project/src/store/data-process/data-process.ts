import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const/enums';
import { fetchWeatherAction } from 'store/api-actions';
import { DataProcess } from 'types/state';

const initialState: DataProcess = {
  weatherCards: [],
  cityRepeatId: undefined
};

export const weatherData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    removeWeatherCard: (state, action) => {
      state.weatherCards = state.weatherCards.filter((card) => card.order !== action.payload);
    },
    updateWeatherCards: (state, action) => {
      state.weatherCards = action.payload;
    },
    resetCityRepeatId: (state) => {
      state.cityRepeatId = undefined;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherAction.fulfilled, (state, action) => {
        const existingCard = state.weatherCards.find((item) => action.payload.city.id === item.city.id);
        if (!existingCard) {
          state.weatherCards.push({...action.payload, order: state.weatherCards.length});
          state.cityRepeatId = undefined;
        } else {
          state.cityRepeatId = existingCard?.city.id;
        }
      });
  }
});

export const {removeWeatherCard, updateWeatherCards, resetCityRepeatId} = weatherData.actions;
