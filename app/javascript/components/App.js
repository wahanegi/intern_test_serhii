import React from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Tweets from "./Tweets/Tweets";


const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tweets />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App