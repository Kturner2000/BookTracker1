import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { IconContext } from "react-icons";

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>

    <App />
    </IconContext.Provider>
  </BrowserRouter>,
)
