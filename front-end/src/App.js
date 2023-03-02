import Nav from './Components/Nav';
import './App.css';
import { BrowserRouter,Routes,Router, Route } from 'react-router-dom';
import SignUp from './Components/Signup';
import Login from './Components/Login';
import Addproduct from './Components/AddProduct';
import PrivateComponent from './Components/PrivateComponent';
import ProductLIst from './Components/ProductList';
import Updateproduct from './Components/UpdateProduct';


function App() {
  return (
    <div className="App">
    <BrowserRouter >
    <Nav />
    <Routes>
    <Route element={<PrivateComponent />}>
    <Route path='/' element={<ProductLIst />} />
    <Route path='/add' element={<Addproduct />} />
    <Route path='/update/:id' element={<Updateproduct />} />
    <Route path='/logout' element={<h1>log out</h1> } />
    <Route path='/profile' element={<h1>profile</h1> } />
   
    </Route>  
    <Route path='/signup' element={<SignUp />} />
    <Route path='/login' element={<Login /> } />
    </Routes>
    </BrowserRouter>
    
    </div>
  );
}


export default App;
