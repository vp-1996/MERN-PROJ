import  React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StaticExample from '../../Shared/Modal';
import axios from 'axios'
import { Navbar2 } from '../../Shared/Navbar2';
import {Footer} from '../../Shared/Footer';
import ClipLoader from "react-spinners/ClipLoader"
// import Box from '@mui/material/Box';
// import GridLoader from '@mui/material/CircularProgress';
// import NavBar from '../../Shared/Navbar';
// import Table from 'react-bootstrap/Table';
//  setTimeout(,3000)

function AssetList() {
  const [asset, GetAsset] = useState([])
  const [path, setPath] = useState('')
  const [loading, setLoading] = useState(false)  


  const getAssets = () => {
    setLoading(true)

    setTimeout(() => {

      axios.get('http://localhost:6001/assets/get-assets')
        .then((res) => {
          // const data = res.data
          setLoading(false)
          console.log(res.data)
          GetAsset(res.data.data)
          setPath(res.data.path)
          // console.log(data)
        })
        .catch((err) => {
          console.log(err);
          //  setLoading(false);
        })

    }, 1500)

  }



  const deleteAsset = (assetID) => {

   if (window.confirm("Are You Sure You Want To Delete This ?")) {

    axios.delete('http://localhost:6001/assets/delete-asset/' + assetID)
    .then(() => {
      console.log("deleted sucessfully")
      getAssets()
    })
    .catch((err) => {
      console.log(err)
    })
    
   }
  }

  useEffect(() => {
    getAssets();
  }, [])

  const token = localStorage.getItem('token')
    if (token===null) {
    return  <StaticExample/>
    }


  return (
    <>
      <Navbar2 />
      {
      loading ?
        <ClipLoader color='blue' size={54} className='spinner'/>
        /* <div style={{backgroundColor:"#F5F6F8",width:"70%",marginLeft:"auto",marginRight:"auto"}}> */
            :
        <table className="table-bordered">
          <thead>
            <tr>
              <td>Full Name</td>
              <td>Model</td>
              <td>Serial</td>
              <td>Image</td>
              <td>Actions</td>
            </tr>
          </thead>


          <tbody>
            {
              asset.map((item, k) => {
                return (
                  <tr key={k}>
                    <td style={{ color: "#77787A", fontSize: "14px", fontFamily: 'Rubik, sans-serif', fontWeight: "bolder", letterSpacing: '1px', width: "20%", height: "" }}>{item.fullName}</td>

                    <td style={{ color: "#77787A", fontSize: "14px", fontFamily: 'Rubik, sans-serif', fontWeight: "bolder", letterSpacing: '1px', width: "15%" }}>{item.model}</td>

                    <td style={{ backgroundColor: "#EFEFEF", color: "#77787A", fontSize: "14px", fontFamily: 'Oswald, sans-serif', fontWeight: "bolder", letterSpacing: '1px', width: "15%" }}>{item.serial}</td> 

                    <td className='asset-img-td'><img alt='' src={path + '/' + item.image} className='asset-img' /></td>

                    {/* <td>{item._id}</td> */}

                    <td className='actions-td'>
                      {/* <Link className='edit-btn'>Edit</Link>*/}
                      <button className='edit-btn'>
                        <Link to={`/UpdateAsset/${item._id}`} className='edit-btn2'>Edit</Link>
                      </button>  

                      <button onClick={() => deleteAsset(item._id)} className='delete-btn'>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        /* </div> */
        }    
     <Footer/>
    </>
  )
}

export default AssetList