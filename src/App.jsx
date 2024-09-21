// import './App.css'

import const_data from './config/constant'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



function App() {
  
  let routerProvider = createBrowserRouter(const_data.REACT_ROUTER_PATH)
  return (
    <>
     <ToastContainer
        position="top-right" // or use other options like "top-center", "bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick //new
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}  // Ensure the toast is above other content
      />

      <RouterProvider router={routerProvider} />
    </>
  )
}

export default App
