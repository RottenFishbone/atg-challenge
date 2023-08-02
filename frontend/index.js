import React from 'react';
import ReactDOM from 'react-dom/client';

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Redux
import { Provider } from 'react-redux';

// Views
import Home from './modules/home/Home';
import Saved from './modules/saved/Saved';
import NotFound from './modules/NotFound';

// Components
import Navbar from './Navbar';
import Footer from './Footer';
import store from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />
  },

  {
    path: '/saved',
    element: <Saved />,
  },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Navbar />
        <RouterProvider router={router} />
        <Footer />
      </Provider>
    </React.StrictMode>
);
