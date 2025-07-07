// App.jsx
import { Provider } from 'react-redux';
import { store } from './config/redux/store';
import Index from './pages/Dashboard/Index';
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ You forgot this
import Home from './pages/Home/Home';
import NetworkUser from './pages/Home/networkuser/NetworkUser';
import View_profile from './pages/Home/networkuser/view_profile/[username]';
import Myconnections from './pages/Home/MyConnections/Myconnections';
import Ats_checker from './pages/Ats_checker/Ats_checker';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/network' element={<NetworkUser/>} />
          <Route path="/view_profile/:username" element={<View_profile/>} />
          <Route path='/Connections' element={<Myconnections/>} />
          <Route path='/ats-checker' element={<Ats_checker/>} />


        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
