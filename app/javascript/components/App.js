import React from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Twits from "./Twits/Twits";
import Twit from "./Twit/Twit";

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Twits />} />
        <Route path="/twits/:slug" element={<Twit />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App