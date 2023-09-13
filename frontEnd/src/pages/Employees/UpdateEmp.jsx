import React,{useEffect, useState,useRef} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
// import NavBar from '../../Shared/Navbar';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import StaticExample from '../../Shared/Modal';
import { Navbar2 } from '../../Shared/Navbar2';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


import {
    // MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
    // MDBSelect
  } from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
// import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import  {faCheck} from '@fortawesome/free-solid-svg-icons'

function UpdateEmp() {

   const initialState={
    fullName:"",
    email:"",
    EmpID:"",
    designation:"",
    manager:"",
    date:""
   }


     const [emp,setEmp]= useState(initialState)
     const {fullName,email,EmpID,designation,manager,date,image}= emp
     const [img,setImg] = useState('')
     const imgRef = useRef()
     const [show,setShow]=useState(false)
     const {id}= useParams()
     const redirect = useNavigate()
      

 const getSingleEmp=()=>{
  axios.get('http://localhost:6001/employee/get-singleEmployee/'+id)
   .then((res)=>{
    console.log(res)
    setEmp(res.data.data)
   })

  .catch((err)=>{
    console.log(err)
  })
 }

     
   const editEmp = ()=>{
     var formData = new FormData()
         formData.append('fullName',fullName)
         formData.append('email',email)
         formData.append('EmpID',EmpID)
         formData.append('designation',designation)
         formData.append('manager',manager)
         formData.append('date',date)
         formData.append('image',imgRef.current.files[0])

            
     axios.put('http://localhost:6001/employee/update-employee/'+id,formData) 
     .then((res)=>{
          console.log(res)
          console.log("update sucessfull")
           setShow(true)
           setTimeout(()=>{
            redirect('/EmpList')
          },2300)
     })
     .catch((err)=>{
       console.log(err)
     })       
       }


const handleChange=(e)=>{
   const {name,value} = e.target
  setEmp({...emp,[name]:value})
}

const handleUpdate=(k)=>{
    k.preventDefault()
    editEmp()
}

const handleImg=(e)=>{
 setImg(e.target.files[0])
}

 useEffect(()=>{
  getSingleEmp()
 },[])


 const token = localStorage.getItem('token')
if (token===null) {
 return   <StaticExample/>
}
  return (

              <>
      
            <Navbar2 />
            
             {/* ////////////Toast↓/////////////// */}
      <Row>
      <Col style={{marginLeft:"38%",position:"absolute",top:"480px",zIndex:"500"}} xs={6}>
        <Toast onClose={() => setShow(false)} show={show}
         delay={5000} autohide
         >
          <Toast.Header style={{backgroundColor:"#7D9832",color:"whitesmoke",fontFamily:"Belanosima, sans-serif",letterSpacing:"1px"}}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Message:</strong>
            <small>Just Now:-</small>
          </Toast.Header>
          <Toast.Body className='ToastBody'>Changes Saved Sucessfully...</Toast.Body>
        </Toast>
      </Col>
      <Col xs={6}>
        {/* <Button onClick={() => setShow(true)}>Show Toast</Button> */}
      </Col>
    </Row>
    
               {/* ///////////////Form Section↓ /////////////////////// */}

            <MDBContainer fluid style={{position:"relative"}}>
      <MDBRow className='d-flex justify-content-center align-items-center'>

        <MDBCol lg='8'>

          <MDBCard className='my-5 rounded-3' style={{maxWidth: '600px',marginLeft:"auto",marginRight:"auto"}}>
            <MDBCardImage src='https://userguiding.com/wp-content/uploads/2021/04/what-is-product-update-1160x387.jpg' style={{height:"221px"}} className='w-100 rounded-top'  alt="Sample photo"/>

            <MDBCardBody className='px-5'>

                    <form onSubmit={handleUpdate} encType="multipart/form-data" >
              {/* <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Update Employee</h3> */}
              
                <br/>
             
              {/* <label style={{fontWeight:"500"}}>Name :-</label> */}
              <MDBInput wrapperClass='mb-4' label='Name:-' id='form1' type='text' required 
              style={{fontFamily:"'Roboto Mono', monospace",letterSpacing:"1px"}}
               value={fullName}
               name='fullName' onChange={handleChange}/>

              {/* <label style={{fontWeight:"500"}}>Email :-</label> */}
              <MDBInput wrapperClass='mb-4' label='Email:-' id='form-a' type='email' required
              style={{fontFamily:"'Roboto Mono', monospace"}} 
               value={email}
               name='email' onChange={handleChange}/>

               
               {/* <label style={{fontWeight:"500"}}>Employee ID :-</label> */}
              <MDBInput wrapperClass='mb-4' label='Employee ID:-' id='form-b' type='text' required
              style={{fontFamily:"'Roboto Mono', monospace"}} 
               value={EmpID}
               name='EmpID' onChange={handleChange}/>
               
               {/* <label style={{fontWeight:"500"}}>Designation :-</label> */}
              <MDBInput wrapperClass='mb-4' label='Designation:-' id='form-c' type='text' required
              style={{fontFamily:"'Roboto Mono', monospace",letterSpacing:"1px"}}
                value={designation}
                name='designation' onChange={handleChange}/>
               
               {/* <label style={{fontWeight:"500"}}>Reporting To Manager :-</label> */}
              <MDBInput wrapperClass='mb-4' label='Reporting To Manager:-' id='form-c' type='text' required
              style={{fontFamily:"'Roboto Mono', monospace",letterSpacing:"1px"}}
                value={manager}
              name='manager' onChange={handleChange}/>

                
                 <MDBRow>
                <MDBCol md='6'>
                {/* <label style={{fontWeight:"500"}}>Date Of Joining :-</label> */}
                  <MDBInput placeholder='dd/mm/yyy' label='Date Of Joining:-' wrapperClass='datepicker mb-4' name='date' id='form2' type='text'
                  style={{fontFamily:"'Roboto Mono', monospace"}} 
                   value={date}
                   onChange={handleChange}/>
                </MDBCol>
              </MDBRow>

              <label className='ImageUpdate-btn' htmlFor='image'>Click Here To Choose Image</label> <br />
            <input 
             ref={imgRef}
              type="file" name='pic' id='image' 
            style={{ display: "none" }} 
             onChange={handleImg}
             />

            <img src={"http://localhost:6001/uploads/EmpPics/" + image} alt='' style={{ borderStyle: '', height: '130px', width: '170px', position: "absolute", marginLeft: "13px",marginTop:"2%"}} 
               className={img ? 'none' : 'block'} 
             />

            <img alt='' className='imgLogic'  src={img && window.URL.createObjectURL(img)}
             style={{ height: '130px', width: '170px', marginLeft: "13px",marginTop:"2%" }} /> <br/><br/>

              <Button type='submit' style={{backgroundColor:"green",marginLeft:"0%",width:"50%"}} className='mb-4 UpdateEmpBtn' size='lg'>Save Changes</Button>
              {/* <FontAwesomeIcon icon={faCheck} /> */}
                           </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

        </>


  )

}

export default UpdateEmp