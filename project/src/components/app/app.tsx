import Main from 'pages/main/main';
import NotFoundScreen from 'pages/not-found-screen/not-found-screen';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from 'const/enums';
import { useAppSelector } from 'hooks/index';
import { getWeatherDataError } from 'store/errors-process/selector';

function App(): JSX.Element {
  const weatherDataError = useAppSelector(getWeatherDataError);

  if (weatherDataError) {
    return (<NotFoundScreen />); //Нужно создать экран недоступности сервера
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<Main />}
      />
      <Route
        path={AppRoute.NotFound}
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default App;
