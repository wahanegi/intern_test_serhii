import React from 'react'
import App from "../components/App";
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";

document.addEventListener('DOMContentLoaded', () => {
  const container = document.body.appendChild(document.getElementById('root'));
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      {/*<Provider>*/}
        <App />
      {/*</Provider>*/}
    </React.StrictMode>
  );
})