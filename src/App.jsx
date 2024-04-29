import { useState } from 'react'
import './App.css'
import {Datetoggle} from "./Components/Datetoggle"
import { Locationinput } from './Components/Locationinput'


function App() {

  return (
    <>
      <Datetoggle/>
      <Locationinput/>
    </>
  )
}

export default App
