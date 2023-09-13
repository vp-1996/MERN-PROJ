import React,{useEffect, useState} from "react";
// import NavBar from "../../Shared/Navbar";
import axios from "axios";
// import Table from 'react-bootstrap/Table';
import { Link,useNavigate } from "react-router-dom"; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Navbar2 } from '../../Shared/Navbar2';
// import BarLoader  from "react-spinners/BarLoader";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import StaticExample from '../../Shared/Modal';
import BarLoader from "react-spinners/BarLoader"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import LangDropDown from "../../Shared/LangDropDown";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Footer } from "../../Shared/Footer";

function EmpList() {

      const [emp,setEmp]= useState([]);
      const [path, setPath] = useState('')
      const [loading, setLoading] = useState(false)
      const [search,setSearch] = useState("")
      const navigate = useNavigate()
      const token = localStorage.getItem('token')

    const getEmpData=()=>{
         setLoading(true)
      setTimeout(()=>{

             if (token===null) {
              console.log("Login First");      
             } 

             else {
              axios.get('http://localhost:6001/employee/get-employees')
              .then((res)=>{
                setLoading(false)
                setEmp(res.data.data);
                setPath(res.data.path)
                console.log(res.data)  
              })
                
           .catch((err)=>{
            alert(err.message)
           })            
             }
      },1500)
        }

const deleteEmployee=(empID)=>{

  if (window.confirm("Are you sure you want to delete this ?")) {
    axios.delete('http://localhost:6001/employee/delete-employee/'+ empID)
    .then(()=>{
     console.log("deleted sucessfully")
     getEmpData()
    })
    .catch((err)=>{
     console.log(err)
    })
  }
   }
         
      const EditButton=(id)=>{
         navigate('/UpdateEmp/'+id)
        }


     //Search....
   const searchEmp = emp.filter(emp=>
      emp.fullName.toLowerCase().includes(search.toLowerCase())
    )

useEffect(()=>{
    getEmpData();
},[])

// const token = localStorage.getItem('token')
if (token===null) {
  console.log("Login First")
 return   <StaticExample/>
}



        
  return (  
    <> 
    <div className="empListDiv" >
    <Navbar2/>
    
    <div  style={{marginTop:"2%"}}> 
      <input  className="searchBar" type="search" onChange={(e)=>setSearch(e.target.value)} placeholder="Search..." value={search} spellCheck={false}/>
      </div>  

      {/* <div style={{marginLeft:"70%",marginTop:"1%"}}>
      <LangDropDown/>
      </div> */}

<Breadcrumb style={{marginLeft:"10%"}}>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Employees List</Breadcrumb.Item>
    </Breadcrumb>

       {
         loading ?
         <BarLoader  speedMultiplier={1}
         width={190} color="#36d7b7" size={50} className="loader"/>
              
            :

            !searchEmp?.length ?
            <h3 style={{marginLeft:"31%",fontFamily:"'Montserrat', sans-serif"}}>No Results Found!!!</h3>
                              :                       
                                // loading ? <BarLoader color="red" height={10}
                                // width={0} style={{marginLeft:"50%",marginTop:"auto"}}
                                // /> 
                                //  : 
                                
                                 <TableContainer className="TC1" 
                                   style={{marginTop:"3%",width:"80%",marginLeft:"auto",marginRight:"auto",boxShadow:"0px 2px 2px 5px grey"}} 
                                 component={Paper}>
                                 <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
                                   <TableHead>
                                     <TableRow>
                                       <TableCell><b>Name</b></TableCell>
                                       <TableCell align="center">
                                         
                                       <b>Email</b>
                                       
                                        </TableCell>
                                       <TableCell
                                        align="center">
                                            <b>Employee ID </b>
                                          
                                   
                                        </TableCell>    
                    <TableCell align="center"><b>Designation</b></TableCell>
                    <TableCell align="center">
                        <b>Joining Date </b>
                                           
                          </TableCell>
                      <TableCell align="center"><b>Reporting Manager</b></TableCell>
                     <TableCell align="center"><b>Photo</b></TableCell>
                  <TableCell align="center"><b>Actions</b></TableCell>
                                     </TableRow>
                                   </TableHead>
                                   
                                   <TableBody>
                                     {
                                     searchEmp.map((row,k) => (
                            <TableRow
                            key={k}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                    <TableCell component="th" scope="row" className="nameData" style={{fontFamily:"'Nunito', sans-serif"}}>
                    {row.fullName}
                  </TableCell>
                  <TableCell className="TableCell" align="center">{row.email}</TableCell>
                  
                  
                                                
                  <TableCell align="center" style={{fontFamily:"'Nunito', sans-serif"}}>{row.EmpID}</TableCell>
                          
                  <TableCell className="TableCell" align="center">{row.designation}</TableCell>
                          
                  <TableCell align="center" style={{fontFamily:"'Nunito', sans-serif"}}>{row.date}</TableCell>
                          
                  <TableCell className="TableCell" align="center">{row.manager}</TableCell>
                          
                  <TableCell align="center" ><img src={path+'/'+row.image} style={{height: "39%", width: "75%", borderRadius: "15px"}} /></TableCell>
                          
                                  <TableCell> 
                                  <div className="d-flex">
                                  <Tooltip className="tt" title="Edit">
                                      <IconButton onClick={()=>EditButton(row._id)} >
                                      <img  src="/images/pencil.png"/>
                                      </IconButton>
                                    </Tooltip>
                               
                          
                                 <Tooltip title="Delete">
                         <IconButton onClick={()=>deleteEmployee(row._id)}>
                        <img src="/images/trash-can.png" style={{marginLeft:"39%",paddingRight:"5px"}}/>
                           </IconButton>
                         </Tooltip>
                           </div>
    
                                    
                          </TableCell>
                         </TableRow>
                           ))}
                      </TableBody>
                       </Table>
                    </TableContainer>
                             
                      }
               </div>

          {/* <div style={{marginTop:"10%"}}>
         <Footer/>
         </div> */}
    </>
    
  )
}

export default EmpList