import React, { useState } from 'react'
 import NavBar from '../../Shared/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StaticExample from '../../Shared/Modal'
import {Navbar2} from '../../Shared/Navbar2';
// import Alert from 'react-bootstrap/Alert';
// import Button from '@mui/material/Button';
// import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {
  // MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  // MDBCheckbox
}
  from 'mdb-react-ui-kit';
// import axios from 'axios';

const Login = () => {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);
  // const [transition, setTransition] = React.useState(undefined);
  const initialState = {email: "", password: "" }     
  const [user, setUser] = useState(initialState)
  const { email, password } = user
  const redirect = useNavigate()


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value }) 
  }

 
    const userLogin = ()=>{
      
      axios.post('http://localhost:6001/user/login',user)
      .then((res)=>{
        setOpen(true)
        console.log(res.data)
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('id',res.data.user._id)
        
        // alert(res.data) 
      
        setUser({ 
          email:"",
          password:""
        })
        setTimeout(()=>{
       redirect('/')
       },2300)
      })

      .catch((error)=>{
       alert(error.response.data.message)
      })
   
  }
 

 

  const handleLogin = (e) => {
    e.preventDefault()
     userLogin()
  }


  return (
    <>
      <Navbar2/> 

      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={3000}  onClose={handleClose}  style={{marginBottom:"35%",marginLeft:"42%"}}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         Login Sucessfull
        </Alert>
      </Snackbar>
    </Stack>

    <br/>

      <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'
      // style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}
      >
        <div className='mask gradient-custom-3'></div>
        <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
          <MDBCardBody className='px-5' style={{boxShadow:"2px 2px 6px 5px grey",borderRadius:"30px"}}>
            <h2 className="text-uppercase text-center mb-5">Admin Login</h2>

            <form onSubmit={handleLogin}>
              <MDBInput wrapperClass='mb-4' required label='Your Email' size='lg' id='form2' value={email} onChange={handleChange} type='email' name='email' />

              <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' value={password} required type='password' name='password' onChange={handleChange} />

              {/* <div className='d-flex flex-row justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' required id='flexCheckDefault' label='I agree all statements in Terms of service' />
              </div> */}
              <button className='mb-4 w-100 gradient-custom-4' style={{ boxShadow: "10px 8px 5px #B6CAEB", backgroundColor: "#386BC0", border: "none", borderRadius: "10px", color: "white", fontWeight: "600" }} size='lg'>Sign In</button>

              <div style={{marginLeft:"29%"}}>
               <a href='https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Faccounts.google.com%2Fb%2F0%2FAddMailService&followup=https%3A%2F%2Faccounts.google.com%2Fb%2F0%2FAddMailService&passive=1209600&ifkv=AXo7B7WOlN6TKtCFTZ-zuG0_uklKfYaJuB_IwVHol3U7-iWSKVmXOPYmdGcZlesgzYHOtfbVn0m8Hg&flowName=GlifWebSignIn&flowEntry=ServiceLogin'><img src='/images/new.png'/></a>
                <a href='https://www.facebook.com/'><img style={{marginLeft:"10%"}} src='/images/facebook.png'/></a> 
                <a href='https://github.com/'><img style={{marginLeft:"10%"}} src='/images/github.png'/></a>
                    </div>


              <p className="text-center text-muted mt-5 mb-0">Don't Have an account? <a href="Register" className="fw-bold text-body"><u>Register here</u></a></p>

            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>


    </>
  )
}

export default Login