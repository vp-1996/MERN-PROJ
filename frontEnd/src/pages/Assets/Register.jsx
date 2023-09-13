import { React, useState } from 'react'
 import {Navbar2} from '../../Shared/Navbar2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';


const Register = () => {

  const initialState = {
    name: '',
    email: '',
    password: '',
    //  repeatPassword: ''
  }
  

  const [user, setUser] = useState(initialState)
  const {name,email,password,
    //  repeatPassword
  } = user
  const redirect = useNavigate()      

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  // if (password==repeatPassword) {
  //    alert("pass match")
  // }

  // else{
  //   alert("pass mismatch")
  // }

  const regUser = () => {

    if (name.trim()==="" || email.trim()==="" || password.trim()==="") {
       alert("Please Check All Fields")
      
    } else {

      // if (password!==repeatPassword) {
      //   alert("pass does not match") 
      //   console.log(password+repeatPassword)
      // }

      
        axios.post('http://localhost:6001/user/register-user',user)
        .then((response) => {
            console.log(response.data);
          alert("user registered successfully...Please Login")
           redirect('/login')
        })
        .catch((error) => {
          alert(error.response.data)
        })   
    }

  }

  const handleRegister = (e) => {
      e.preventDefault()
      regUser()
   
  }

  return (
    <>
      <Navbar2 />
      <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'
      //  style={{backgroundColor:"#51B9C1"}}
      // style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}
      >
        <div className='mask gradient-custom-3'></div>
        <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
          <MDBCardBody className='px-5'>
            <h2 className="text-uppercase text-center mb-5">Create an account</h2>

            <form onSubmit={handleRegister}>

              <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' name='name' onChange={handleChange}
                value={name}
              />

              <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' name='email'
                 value={email}
                onChange={handleChange} />

              <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' name='password'
                 value={password}
                onChange={handleChange} />

              {/* <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password' value={repeatPassword} name='RP'
                 onChange={handleChange}
                />   */}

              <div className='d-flex flex-row justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' required label='I agree all statements in Terms of service' />
              </div>
              <button style={{backgroundColor:"#386BC0",color:"white",fontWeight:"600",border:"none",borderRadius:"10px",boxShadow:"5px 4px #B6CAEB"}} className='mb-4 w-100 gradient-custom-4' size='lg'>Register</button>

                   <div style={{marginLeft:"29%"}}>
               <a href='https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Faccounts.google.com%2Fb%2F0%2FAddMailService&followup=https%3A%2F%2Faccounts.google.com%2Fb%2F0%2FAddMailService&passive=1209600&ifkv=AXo7B7WOlN6TKtCFTZ-zuG0_uklKfYaJuB_IwVHol3U7-iWSKVmXOPYmdGcZlesgzYHOtfbVn0m8Hg&flowName=GlifWebSignIn&flowEntry=ServiceLogin'><img src='/images/new.png'/></a>
                <a href='https://www.facebook.com/'><img style={{marginLeft:"10%"}} src='/images/facebook.png'/></a> 
                <a href='https://github.com/'><img style={{marginLeft:"10%"}} src='/images/github.png'/></a>
                    </div>

              <p className="text-center text-muted mt-5 mb-0">Already have an account? <a href="login" className="fw-bold text-body"><u>Login here</u></a></p>
                           </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  )
}

export default Register