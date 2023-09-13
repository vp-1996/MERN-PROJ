import { React, useState,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StaticExample from '../../Shared/Modal';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// import Alert from 'react-bootstrap/Alert';
// import Button from 'react-bootstrap/Button';
//  import NavBar from '../../Shared/Navbar'; 
 import { Navbar2 } from '../../Shared/Navbar2';
 import { Footer } from '../../Shared/Footer';

const AddAssets = () => {
  const initialState = {
    fullName: "",
    serial: "",
    model: "",
     }

  // const[loading,setLoading] = useState(false)
  const redirect = useNavigate()
  const [img, setImg] = useState(null)
  const [asset, setAsset] = useState(initialState)
  const { fullName, serial, model } = asset
  // const [page,setPage] = useState(null)
  const imgRef = useRef()

  
    const token = localStorage.getItem('token')
    if (token===null) {
    return  <StaticExample/>
    }

    // else{
      
    // }
 


  const handleChange = (e) => {
    // setAsset(e.target)
    const { name, value } = e.target
    //  setAsset((prev)=>({...prev,[name]:value}))
    setAsset({ ...asset, [name]: value })
  }

  const handleImg = (e) => {
    setImg(e.target.files[0])
  }

  const createAsset = (pic) => {

    if (fullName.trim() === "" || serial.trim() === "" || model.trim() === "" || img===null) 
     {
      alert("SOMETHING IS MISSING")
    }


    else {
      const formData = new FormData()
      formData.append('fullName', fullName)
      formData.append('serial', serial)
      formData.append('model', model)
      formData.append('pic',imgRef.current.files[0])
      // console.log(imgRef.current.files[0])
      axios.post('http://localhost:6001/assets/add-asset',formData)
      .then((res)=>{
                console.log(res)
                 redirect("/AssetList2")
                 
      })
      .catch((err)=>{
           console.log(err)
      })
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    createAsset()
    // fileUpload()

  }

  return (
    < >
      <Navbar2/>
            <section className="vh-100">
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius:"25px"}}>
          <div className="card-body p-md-5"  >
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 mainDiv">

                <p style={{paddingRight:"26%"}} className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-0">Add Asset</p>

                <form className="mx-1 mx-md-4" onSubmit={handleSubmit} encType="multipart/form-data">

                  <div className="d-flex flex-row align-items-center mb-4">
                    {/* <i className="fas fa-user fa-lg me-3 fa-fw"></i> */}
                    <div className="form-outline flex-fill mb-0">
                    <label className="form-label" htmlFor="form3Example1c"><b>Name :</b></label> <br/>
                      <input type="text" id="form3Example1c" name='fullName' value={fullName} onChange={handleChange} /> 
                      
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                  {/* <i className="fas fa-free-code-camp fa-fw" aria-hidden="true"></i> */}

                    <div className="form-outline flex-fill mb-0">
                    <label className="form-label" htmlFor="form3Example3c"><b>Serial :</b></label> <br/>
                      <input value={serial} name='serial' onChange={handleChange} type="text" id="form3Example3c"/>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    {/* <i className="fas fa-lock fa-lg me-3 fa-fw"></i> */}
                    <div className="form-outline flex-fill mb-0">
                    <label className="form-label" htmlFor="form3Example4c"><b>Model :</b></label> <br/>
                      <input value={model} name='model' onChange={handleChange} type="text" id="form3Example4c"/>
                    </div>
                  </div> 

              <label className='ImageUpload-btn' htmlFor='image'>Click Here To Choose Image</label> <br />
            <input ref={imgRef} type="file" name='pic' id='image' style={{ display: "none" }} onChange={handleImg} />

            <img src='/images/photo.png' alt='' style={{ borderStyle: 'dashed', height: '130px', width: '170px', position: "absolute", marginLeft: "20px" }} className={img ? 'none' : 'block'} />

            <img alt='' src={img && window.URL.createObjectURL(img)} style={{ height: '130px', width: '170px', marginLeft: "20px" }} /> 

                  <div className="form-check d-flex justify-content-center mt-5">
                    <input className="form-check-input me-2" type="checkbox" value="" required id="form2Example3c" />
                    <label className="form-check-label" style={{marginRight:"60px"}} htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg" style={{marginRight:"49%",marginTop:"8%"}}>SUBMIT</button>
                  </div>

                   

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* <div style={{marginTop:"14%"}}>
         <Footer/>
         </div> */}
    </>
  )
}

export default AddAssets