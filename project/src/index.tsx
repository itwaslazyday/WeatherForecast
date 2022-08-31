import ReactDOM from 'react-dom/client';
import App from 'components/app/app';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
