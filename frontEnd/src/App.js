// App.js
// eslint-disable-next-line
// import logo from './logo.svg';
import './App.css';
import AddAssets from './pages/Assets/addAssets';
import AssetList from './pages/Assets/assetList';
import UpdateAsset from './pages/Assets/updateAsset';
import Register from './pages/Assets/Register';
import EmpList from './pages/Employees/EmpList';
import Login from './pages/Assets/login';
import UpdateEmp from './pages/Employees/UpdateEmp';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import NavBar from './Shared/Navbar';
//  import StickyHeadTable from './pages/Employees/Table';
import EnhancedTable from './pages/Employees/Table';
import AddEmp from './pages/Employees/addEmp';
import Dashboard from './pages/Dashboard';
import AssetList2 from './pages/Assets/AssetList2';

function App() {
  return (
    <BrowserRouter>
    {/* <NavBar/> */}
    <Routes>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/' element={<AddAssets/>}/>
      <Route path='/assetList' element={<AssetList/>}/>
      <Route path='/UpdateAsset/:id' element={<UpdateAsset/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/addEmp' element={<AddEmp/>}/>
      <Route path='/EmpList' element={<EmpList/>}></Route>
      {/* <Route path='/Table' element={<StickyHeadTable/>}></Route> */}
      {/* <Route path='/Table' element={<EnhancedTable/>}></Route> */}
      {/* <Route path='/'/> */}
      <Route path='/UpdateEmp/:id' element={<UpdateEmp/>}/>
      <Route path='Dashboard'element={<Dashboard/>} ></Route>
      <Route path='/AssetList2' element={<AssetList2/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;