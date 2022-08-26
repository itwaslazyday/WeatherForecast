import Main from 'pages/main/main';
import NotFoundScreen from 'pages/not-found-screen/not-found-screen';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from 'const';

function App(): JSX.Element {
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
