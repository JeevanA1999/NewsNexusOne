import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './Store/store.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
