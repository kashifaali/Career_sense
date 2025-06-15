// App.jsx
import { Provider } from 'react-redux';
import { store } from './config/redux/store';
import Index from './pages/Dashboard/Index';
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ You forgot this
import Home from './pages/Home/Home';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
