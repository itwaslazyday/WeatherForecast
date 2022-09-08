import ReactDOM from 'react-dom/client';
import App from 'components/app/app';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from 'store';
import {Provider} from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <Router>
      <DndProvider backend={HTML5Backend}>
        <App/>
      </DndProvider>
    </Router>
  </Provider>
);
