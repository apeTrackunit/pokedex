import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {PokemonsPage} from "./PokemonsPage";
import {AboutPage} from "./AboutPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const RoutingTable = {
    root: '/pokedex',
    pokedex: '/pokedex',
    about: '/about'
} as const;

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path={"/"}
            element={
                <App/>
            }
        >
            <Route index element={<PokemonsPage/>} />

            <Route path={RoutingTable.pokedex}>
                <Route index element={<PokemonsPage/>} />
            </Route>
            <Route path={RoutingTable.about}>
                <Route index element={<AboutPage />} />
            </Route>
        </Route>
    )
);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
