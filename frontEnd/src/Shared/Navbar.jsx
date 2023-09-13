// import React, { useEffect, useState } from 'react';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link,NavLink,useLocation,useNavigate,useParams} from 'react-router-dom';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// // import BasicExample from './Toast';
// // import Dropdown2 from './Toast';
// // import CustomizedMenus from './Toast';

// function NavBar() {
//         const {pathname}= useLocation()
//         const [auth,setAuth] = useState(null)
//         const params = useParams()

//         useEffect(()=>{
//           const token = localStorage.getItem('token')
//           setAuth(token)
//         })

   


//         const handleLogout=()=>{
//           // const token = localStorage.getItem('token');
//             localStorage.removeItem('token')
//         }


//   return (
//     <>
//      <Navbar style={{backgroundColor:"black",height:"52px", boxShadow:"2px 6px 3px #D0CBCB",position:"sticky",top:"0px",zIndex:"1000 "}}>
//         <Container>
//           {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}  
//           <Nav  className="me-auto">
            
     
//             {
//               !auth ? (
//                 <>
//                 <Link to={'/Register'} className={'/Register'===pathname?'activeClass':'navlink'} >REGISTER</Link>

//                 <Link to={'/login'} className={'/login'===pathname?'activeClass':'navlink'}>LOGIN</Link>
//                    </>
//               )
//                :
//              (
//              <>
             
//              <NavLink to={'/'} className={(isActive)=>isActive.isActive?'activeClass addAssetNav':'navlink'}>ADD ASSETS</NavLink>

//             <Link to={'/AssetList'} className={'/AssetList'===pathname?'activeClass':'navlink'}>ASSET LIST</Link>


//              {/* <Link to={'/EmpList'} className={["/EmpList", `/UpdateEmp/${params.id}`].includes(pathname) ? 'activeClass navlink ' : 'navlink'}>EMPLOYEES LIST</Link> */}

//             <Link to={'/AddEmp'} className={'/AddEmp'===pathname?'activeClass':'navlink'}>ADD EMPLOYEE</Link>

//             <Link to={'/EmpList'} className={'/EmpList'===pathname?'activeClass':'navlink'}>EMPLOYEES LIST</Link>


//             <Link onClick={handleLogout} to={'/login'} className={'/Logout'===pathname?'activeClass navlink':'navlink'}>LogOut</Link>
             
//              </>
//              )
//             }
//          {/* <Link to={'/UpdateAsset'} className={'/UpdateAsset'===pathname?'activeClass navlink':'navlink'}>Update Asset</Link> */}
//          </Nav>
//         </Container>
//       </Navbar>
//     </>
//   )
// }

// export default NavBar