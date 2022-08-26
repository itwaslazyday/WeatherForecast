import Main from 'pages/main/main';
import NotFoundScreen from 'pages/not-found-screen/not-found-screen';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from 'const';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<Main />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
      </Route>
    </Routes>
  );
}

export default App;
