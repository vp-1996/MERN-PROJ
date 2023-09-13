import  React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StaticExample from '../../Shared/Modal';
// import NavBar from '../../Shared/Navbar';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { Navbar2 } from '../../Shared/Navbar2';
import ClipLoader from "react-spinners/ClipLoader"
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Footer } from '../../Shared/Footer';


const AssetList2 = () => {

    const [asset, GetAsset] = useState([])
    const [path, setPath] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false); //MUI snackbar

  
                  // Snackbar Code
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
      // Snackbar Code Ends
  
    const getAssets = () => {
      setLoading(true)
  
      setTimeout(() => {
  
        axios.get('http://localhost:6001/assets/get-assets')
          .then((res) => {
            // const data = res.data
                if (token===null) {
                  console.log("Login Or Create Account");
                }
                else{
                  setLoading(false)
                  console.log(res.data)
                  GetAsset(res.data.data)
                  setPath(res.data.path)
                  // console.log(data)
                }         
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
        setOpen(true);
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
      // setTimeout(() => {
      //   getAssets();
      // }, 3000);
    }, [])

    const token = localStorage.getItem('token')
    if (token===null) {

    return  <StaticExample/>
    }


  return (
    <>
     <Navbar2 />
   
     <Breadcrumb style={{marginLeft:"10%"}}>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Asset List</Breadcrumb.Item>
    </Breadcrumb>


     {/* <Button>Open simple snackbar</Button> */}
      <Snackbar style={{marginLeft:"39%"}}
        open={open} 
        autoHideDuration={3000}
        onClose={handleClose}
        message="Deleted Sucessfully"
        action={action}
      />

      {
      loading ?
        <ClipLoader color='blue' size={54} className='spinner'/>
        /* <div style={{backgroundColor:"#F5F6F8",width:"70%",marginLeft:"auto",marginRight:"auto"}}> */
            :
        <Table responsive='lg' className="table-bordered"  >
          <thead>
            <tr>
              <td>Name</td>
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
                    <td style={{ color: "#77787A", fontSize: "14px", fontFamily: 'Rubik, sans-serif', fontWeight: "bolder", letterSpacing: '1px', width: "20%", height: "5%",paddingTop:"3%",borderStyle:"ridge" }}>{item.fullName}</td>

                    <td style={{ color: "#77787A", fontSize: "14px", fontFamily: 'Rubik, sans-serif', fontWeight: "bolder", letterSpacing: '1px', width: "15%",paddingTop:"3%",borderStyle:"ridge" }}>{item.model}</td>

                    <td style={{ backgroundColor: "#EFEFEF", color: "#77787A", fontSize: "14px", fontFamily: 'Oswald, sans-serif', fontWeight: "bolder", letterSpacing: '2px', width: "15%",paddingTop:"3%" }}>{item.serial}</td> 

                    <td className='asset-img-td'><img alt='' src={path + '/' + item.image} className='asset-img' /></td>

                    {/* <td>{item._id}</td> */}

                    <td className='actions-td' style={{paddingTop:"3%"}} >
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
        </Table>
        /* </div> */
      }
      
         <div style={{marginTop:"15%"}}>
         <Footer/>
         </div>
    </>
  )
}

export default AssetList2