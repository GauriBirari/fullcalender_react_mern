import React from 'react'
import Home from './component/Home'
import Calender from './component/Calender'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      {/* <Home /> */}
      <ToastContainer toastClassName="toast-homepage" />

      <Calender />
    </>
  )
}

export default App
