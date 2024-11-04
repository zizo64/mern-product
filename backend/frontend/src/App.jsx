import { useState } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import Navbar from './components/Navbar'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Provider store={store}> 
    <Box minH={"100vh"}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/sign-in" element={<SignIn/>} />
      {/* <Route  element={<PrivateRoute/>} > */}
      <Route path="/profile" element={<Profile/>} />
      {/* </Route> */}
      </Routes>
    </Box>
    </Provider>
    </>
  )
}

export default App
