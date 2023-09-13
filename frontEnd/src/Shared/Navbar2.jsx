import React,{useEffect,useState} from "react";
import { Link,NavLink,useLocation,useNavigate,useParams} from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import {AiFillCloseCircle} from 'react-icons/ai'

 export const Navbar2 = ()=>{
    const {pathname}= useLocation();
    console.log(pathname);
    const [auth,setAuth] = useState(null)
    const params = useParams()

    useEffect(()=>{
      const token = localStorage.getItem('token')
      setAuth(token)
    })

       

    const handleLogout=()=>{
      // const token = localStorage.getItem('token');
        localStorage.removeItem('token')
    }



  return(
       <>
     {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} style={{backgroundColor:"black"}} className="bg-body-tertiary mb-3">
          <Container fluid>

                  {
                       !auth ? (
                        <>
                        <div style={{marginLeft:"80%"}}>
                        <Link to={'/Register'} className={'/Register'===pathname?'activeClass':'navlink'} >REGISTER</Link>
        
                        <Link to={'/login'} className={'/login'===pathname?'activeClass':'navlink'}>LOGIN</Link> 
                        </div>
                           </> 
                      )
                       :
                     (
                     <>
            <Navbar.Toggle style={{backgroundColor:"gray"}} aria-controls={`offcanvasNavbar-expand-${expand}`} ><img src="/images/hamburger.png"/>  </Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end" 
            >

             <Offcanvas.Header style={{backgroundColor:"black"}} closeButton>
                
              {/* <button>X</button> */}
                {/* <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title> */}
              </Offcanvas.Header>
                 <Offcanvas.Body style={{backgroundColor:"black"}}>

                 {/* <Navbar.Brand href="#"><img src="/images/download (1).jpeg" style={{height:"80px",width:"90px"}}/>  </Navbar.Brand> */}

               

                 <Nav className="justify-content-center flex-grow-1 pe-3">   
                       
                  <Link to={'/'} className="Logo" >
                    <img src="/images/logo-2150297_640.webp" className="logoPic" 
                      // style={{height:"50px",width:"70px"}}
                     />
                  </Link>
              {/* <Link to={'/'}>
                <img src="/images/images.png" style={{height:"30%",width:"40%",backgroundColor:"blue"}}/>
               </Link> */}
                 

                       <Nav.Link>
                  <NavLink to={'/'} className={(isActive)=>isActive.isActive?'activeClass addAssetNav':'navlink'}>ADD ASSETS</NavLink>
                  </Nav.Link>

                  <Nav.Link>
            <Link to={'/AssetList2'} className={'/AssetList2'===pathname?'activeClass':'navlink'}>ASSET LIST</Link>
                 </Nav.Link>

                 <Nav.Link>
            <Link to={'/AddEmp'} className={'/AddEmp'===pathname?'activeClass':'navlink'}>ADD EMPLOYEE</Link>
            </Nav.Link>

            <Nav.Link>
            <Link to={'/EmpList'} className={'/EmpList'===pathname?'activeClass':'navlink'}>EMPLOYEES LIST</Link>
            </Nav.Link>

            {/* <Nav.Link className="nl">
              <Link to={'/Dashboard'} className={'/Dashboard'===pathname?'activeClass':'navlink'}><img src="/images/user.png"/> My Account</Link>
              </Nav.Link> */}
           
           <Nav.Link className="Navlink-Logout">
            <Link onClick={handleLogout} to={'/login'} className={'/Logout'===pathname?'activeClass navlink':'navlink'}><img src="/images/sign-out.png"/> LOGOUT</Link>
            </Nav.Link>
            
            </Nav>
            </Offcanvas.Body>
            </Navbar.Offcanvas>
                     </>
                     )
                  }            
          </Container>
        </Navbar>
      ))}

     </>
  )
 }




