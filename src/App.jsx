import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import WishList from './pages/wishList/WishList';
import Navbar from './components/navbar/Navbar';
import SingleBook from './pages/singleBook/SingleBook';

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/wishList' element={<WishList></WishList>}></Route>
        <Route path='/books/:id' element={<SingleBook></SingleBook>}></Route>
      </Routes>
    </>
  )
}

export default App
