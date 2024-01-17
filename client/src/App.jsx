import router from './Router'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './stores'

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    
  )
}

export default App
