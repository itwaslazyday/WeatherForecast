import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const';
import { fetchWeatherAction } from 'store/api-actions';
import { ErrorsProcess } from 'types/state';

const initialState: ErrorsProcess = {
  weatherDataError: false
};

export const errorsProcess = createSlice({
  name: NameSpace.Errors,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherAction.rejected, (state) => {
        state.weatherDataError = true;
      });
  }
});
