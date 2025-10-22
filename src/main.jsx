// Import React and ReactDOM to render the app
import React from 'react';
import ReactDOM from 'react-dom/client';
// Import Provider from React-Redux to connect Redux to React
import { Provider } from 'react-redux';
// Import the Redux store
import { store } from './redux/store';
// Import the main App component
import App from './App';
// Import global styles
import './index.css';

// Render the app inside the root div in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the app with the Redux Provider to give it access to the store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
