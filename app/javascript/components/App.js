import React from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Twits from "./Twits/Twits";


const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Twits />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App