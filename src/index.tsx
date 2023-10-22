import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import "./font/index.css"

import { Portfolio } from "./portfolio";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HashRouter>
    <Portfolio/>
  </HashRouter>
);
