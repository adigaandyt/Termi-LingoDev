import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';

import './i18n'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Spinner from './components/Spinner';
import $ from 'jquery';


const container = document.getElementById('root');
const root = createRoot(container);

const spinner=(
<Spinner/>
)
  

root.render(
  <Suspense fallback={spinner}>
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </React.StrictMode> */}
  </Suspense>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
