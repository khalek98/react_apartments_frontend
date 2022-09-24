import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';

import store from './redux/store';

import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Provider>,
);
