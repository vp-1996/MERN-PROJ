import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar2 } from '../Shared/Navbar2';
import { useParams } from 'react-router-dom';


const Dashboard = () => {

  const {id} = useParams()
  const [proile, setProfile] = useState(null)

  useEffect(() => {
    let token = localStorage.getItem('token')
    const fetchProfile = () => {
      const userId = localStorage.getItem("id")
      console.log(userId)
      axios.get(`http://localhost:6001/user/get-singleUser/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

        .then((res) => {
          console.log(res.data.data)
          setProfile(res.data.data)
        })

        .catch((error) => {
          console.log(error);
        })
         }

    if (token !== null) {
      fetchProfile()
    }
  }, [])


  return (
    <>
      <Navbar2 />

      <div>
        {
          !proile ?
            <p>Not logged in</p>
            :
            <div>
              <p>{proile.email}</p>
              <p>{proile.name}</p>
            </div>
        }

      </div>

    </>
  )
}



export default Dashboard