import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from 'types/state';
import { WeatherCard, Coord } from 'types/card';
import { API_KEY } from 'services/api';

export const fetchWeatherAction = createAsyncThunk<WeatherCard, Coord, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/weather',
  async ({ lat, lon }, { dispatch, extra: api }) => {
    const { data } = await api.get<WeatherCard>(`forecast?lat=${lat}6&lon=${lon}&lang=ru&appid=${API_KEY}`);

    return data;
  },
);
