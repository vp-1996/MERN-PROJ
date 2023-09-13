import React, { useState,useRef } from 'react';
import {useNavigate} from 'react-router-dom';
// import OffcanvasExample from '../../Shared/Navbar2';
import NavBar from '../../Shared/Navbar';
// import BasicToast from '../../Shared/Toast';
// import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import StaticExample from '../../Shared/Modal';
import { Navbar2 } from '../../Shared/Navbar2';
// import AutohideToast from '../../Shared/Toast';
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
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';


 const AddEmp = () => {


  
    const initialState={
        fullName:'',
        email:'',
        EmpID:'',
        designation:'',
        manager:'',
        date:''
    }

    const [show, setShow] = useState(false);////Toast 
    const [employee,setEmployee] = useState(initialState);
    const [img,setImg] = useState(null);
    const imgRef = useRef();
    const {fullName,email,EmpID,designation,manager,date} = employee
    const redirect = useNavigate()

    // var dte = "4/5/1"
    
        // console.log(datePattern.test(date));
              //  console.log(test(datePattern));
    // if (date!==dateExp) {
    //   console.log('date format is not supp');
    // }

    const token = localStorage.getItem('token')
    if (token===null) {
    return  <StaticExample/>
    }

    const handleChange=(e)=>{
      const {name,value} = e.target
      setEmployee({...employee,[name]:value}) 
    }

    const handleImg=(m)=>{
         setImg(m.target.files[0])
    }

    const addEmployee=()=>{
       const formData = new FormData()
       formData.append('fullName',fullName)
       formData.append('email',email)
       formData.append('EmpID',EmpID)
       formData.append('designation',designation)
       formData.append('manager',manager)
       formData.append('date',date)
       formData.append('image',imgRef.current.files[0])

       let dateRegex= /((\d{2})|(\d))\/((\d{2})|(\d))\/((\d{4})|(\d{2}))/
     var dateCheck = dateRegex.test(date)
    if (dateCheck===false) {
       return alert("incorrect date format")
    }

    //  else{
    //   return alert("enter corr df")
    //  }

     axios.post('http://localhost:6001/employee/add-Employee',formData)
      .then((res)=>{
        console.log(res)
         setShow(true)
        setTimeout(()=>{
          redirect('/EmpList')
        },2500)
         
      //  { <AutohideToast/>}
        })

      .catch((err)=>{
        console.log(err)
      })
    }

       const handleSubmit=(k)=>{
         k.preventDefault()
         addEmployee()
        }
     
    return (
        <>
        {/* style={{marginLeft:"auto",marginRight:"auto"}} */}
            <Navbar2/>
            <div className='addEmpDiv'>

             {/* ////////////Toast↓/////////////// */}
   <Row>
      <Col style={{marginLeft:"35%",position:"absolute",top:"480px",zIndex:"500",opacity:"85%"}} xs={6}>
        <Toast onClose={() => setShow(false)} show={show}
         delay={3000} autohide
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
          <Toast.Body style={{backgroundColor:"#7C943A",color:"white",opacity:"40",fontFamily:'Belanosima,sans-serif',letterSpacing:"1px"}}>Employee Added Sucessfully...</Toast.Body>
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
            <MDBCardImage src='https://iveybusinessjournal.com/wp-content/uploads/2006/03/iStock_000012204568_Large.jpg' style={{height:"221px"}} className='w-100 rounded-top'  alt="Sample photo"/>

            <MDBCardBody className='px-5'>

                    <form onSubmit={handleSubmit} encType="multipart/form-data" >
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Add Employee</h3>

              <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' required 
              value={fullName}
               name='fullName' onChange={handleChange}/>

              <MDBInput wrapperClass='mb-4' label='Email' id='form-a' type='email' required 
              value={email}
               name='email' onChange={handleChange}/>

              <MDBInput wrapperClass='mb-4' label='Employee ID' id='form-b' type='text' required 
              value={EmpID}
               name='EmpID' onChange={handleChange}/>

              <MDBInput wrapperClass='mb-4' label='Designation' id='form-c' type='text' required
               value={designation}
                name='designation' onChange={handleChange}/>

              <MDBInput wrapperClass='mb-4' label='Reporting To Manager:-' id='form-c' type='text' required
               value={manager}
              name='manager' onChange={handleChange}/>

 
              <MDBRow>
                <MDBCol md='6'>
                  <MDBInput placeholder='dd/mm/yyy' wrapperClass='datepicker mb-4' label='Date Of Joining'  name='date' id='form2' type='text' 
                  value={date}
                   onChange={handleChange}/>
                </MDBCol>
              </MDBRow>

              <label className='ImageUpload-btn' htmlFor='image'>Click Here To Choose Image</label> <br />
            <input ref={imgRef}  type="file" name='pic' id='image' 
            style={{ display: "none" }} 
             onChange={handleImg}
             />

            <img src='/images/profile.png' alt='' style={{ borderStyle: '', height: '130px', width: '150px', position: "absolute", marginLeft: "30px" }} 
               className={img ? 'none' : 'block'} 
             />

            <img alt=''  src={img && window.URL.createObjectURL(img)}
             style={{ height: '130px', width: '170px', marginLeft: "20px" }} /> <br/><br/>

              <Button type='submit' style={{backgroundColor:"green",marginLeft:"12%"}} className='mb-4' size='lg'>Submit</Button>
                           </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

         </div>

        </>
    )
}


export default AddEmp