import { React, useState, useEffect,useRef } from 'react'
//  import NavBar from '../../Shared/Navbar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Navbar2 } from '../../Shared/Navbar2'
import { Footer } from '../../Shared/Footer'

const UpdateAsset = () => {
  const initialState = {
    fullName: "",
    serial: "",
    model: ""
  }

  
  const { id } = useParams()
  const [asset, setAsset] = useState(initialState)
  const { fullName, serial, model,image } = asset
  const [img, setImg] = useState("")
  const redirect = useNavigate()
  const [path, setPath] = useState('')
  const imgRef = useRef()

  const handleChange = (e) => {
    const { name, value } = e.target
    setAsset({ ...asset, [name]: value })
  }

  const handleImg = (e) => {
    setImg(e.target.files[0])
    // console.log(e.target.files[0])
  }



  const getSingleAsset =  () => {
    axios.get('http://localhost:6001/assets/get-SingleAsset/' + id)
      .then((resp) => {
        console.log(resp.data)
        setAsset(resp.data.data)
        setPath(resp.data.path) 
      })
      .catch((err) => {
        console.log(err)
      })
  }
  /////////////////////////////////////////

  const editAsset = () => {
      // try {
    const formData = new FormData()
    formData.append('fullName',fullName)
    formData.append('serial',serial)
    formData.append('model',model)
    formData.append('pic',imgRef.current.files[0])

    // const {data}=
    axios.put('http://localhost:6001/assets/update-asset/' + id, formData)
      .then((res) => {
        console.log(res)
        // setAsset
        console.log("update sucessfull")
        redirect('/assetList')    
      }).catch((err) => {
        console.log(err)
      })
  
  }

 

  const handleUpdate = (k) => {
    k.preventDefault()
    editAsset()
      //  fileUpload()
  }

  useEffect(() => {
    // editAsset()
    getSingleAsset()
  }, [])


  return (
    <>
      {/* <NavBar /> */}
      <Navbar2/>

    <section className="vh-100">
      <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11" style={{marginTop:"0%"}}>
          <div className="card text-black" style={{ borderRadius: "25px" }}>
            <div className="card-body p-md-5">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 mainDiv">
             {/* <img style={{width:"600px",height:"200px"}} src='/images/32408524-update-updating-software-now-and-here-to-the-latest-newest-version-or-new-edition.jpg'/> */}                       
           <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Update An Asset</p>

                      <form className="mx-1 mx-md-4"
                        onSubmit={handleUpdate}
                        encType="multipart/form-data">

                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-user fa-lg me-3 fa-fw"></i> */}
                          <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example1c"><b>Asset Name :</b></label> <br/>
                            <input type="text" id="form3Example1c"  name='fullName' value={fullName} onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
                          <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c"><b>Serial :</b></label> <br/>
                            <input name='serial' value={serial} onChange={handleChange}
                              type="text" id="form3Example3c"/>
                            
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-lock fa-lg me-3 fa-fw"></i> */}
                          <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4c"><b>Model :</b></label><br/>
                            <input name='model' value={model} onChange={handleChange}
                              type="text" id="form3Example4c"/>     
                          </div>
                        </div>

                        <label className='ImageUpload-btn' htmlFor='image'>Click Here To Choose Image</label> <br />
                        <input ref={imgRef} type="file" name='pic' id='image' style={{ display: "none" }}
                          onChange={handleImg}
                        />

                        <img  src={"http://localhost:6001/uploads/" + image} alt='' style={{ borderStyle: 'dashed', height: '130px', width: '170px', position: "absolute", marginLeft: "20px" }}
                          className={img ? 'none' : 'block'}
                        />

                        <img alt='' src={img && window.URL.createObjectURL(img)} style={{ height: '130px', width: '170px', marginLeft: "20px" }} />

                        <div className="form-check d-flex justify-content-center mt-5">
                          <input className="form-check-input me-2" type="checkbox" id="form2Example3c" />
                          <label className="form-check-label" style={{ marginRight: "60px" }} htmlFor="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg" style={{ marginRight: "49%", marginTop: "8%" }}>Update</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      {/* /////////////////////////////////////////////////////// */}
    <div className='footerDiv' style={{marginTop:"20%",zIndex:"400"}}>
    <Footer/>
    </div>
      
    </>
  )
}

export default UpdateAsset