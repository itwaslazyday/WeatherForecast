import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import {AppDispatch, State} from '../types/state.js';
// import {Forecast, Coord} from '../types/types.js';
// import { API_KEY } from 'services/api.js';

// export const fetchWeatherAction = createAsyncThunk<Forecast, Coord, {
//   dispatch: AppDispatch,
//   state: State,
//   extra: AxiosInstance
// }>(
//   'data/city',
//   async ({lat, lon}, {dispatch, extra: api}) => {
//     const {data} = await api.get<Forecast>(`forecast?lat=${lat}6&lon=${lon}&appid=${API_KEY}`);
//     return data;
//   },
// );
