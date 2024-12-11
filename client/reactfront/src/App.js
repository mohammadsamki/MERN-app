import './App.css';

import {BrowserRouter, Link, Route, Routes} from'react-router-dom';

import Home from './componants/home';
import Login from './componants/loginCheck';
import Orders from './componants/orders';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/orders" exact element={<Orders />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
     {/* <Login/> */}
    </div>
  );
}

export default App;
