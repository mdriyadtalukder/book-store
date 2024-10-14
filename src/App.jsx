import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import WishList from './pages/wishList/WishList';
import Navbar from './components/navbar/Navbar';

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/wishList' element={<WishList></WishList>}></Route>
      </Routes>
    </>
  )
}

export default App
