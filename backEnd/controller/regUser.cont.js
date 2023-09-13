import registerUser from '../model/userModel';
import bcrypt from 'bcrypt';
import  JWT  from 'jsonwebtoken';

export const register = async (req,res)=>{
try {
    const {name,email,password}=req.body
    console.log(req.body)
   const existingUser = await registerUser.findOne({email})  
              // For existing User
   if (existingUser) {
     return res.status(400).send({
        success: false, 
         message:"User already exist"
     })
   }

   // For un-registered User

   

const hashedPass= await bcrypt.hash(password,10)

const userData = new registerUser({
     name,email,password:hashedPass
})
   const save = userData.save()    
 
  res.status(200).json({
    success:true,
    message:"User Sucessfully Registered"
  })

    } 

catch (error) {
  console.log(error)
  res.status(400).json({
    success:false,
    message:"error in Reg"
  })
}
}

// Login Section

export const login = async (req,res)=>{
  try {
    const {email,password} = req.body

    console.log(req.body)

     const user = await registerUser.findOne({email});
     if (!user) {
      return res.status(400).send({
        success:false,
        message:"Email is Unregistered / Invalid"
      })
     }

     const match = await bcrypt.compare(password,user.password)
      if (!match) {
        return res.status(400).send({
          success: false,
          message:"Invalid Passsword"
        })
      }
      
      //  const secretKey = hfe78e95498gt
     const token = JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"2d"})

     res.status(200).send({
      success:true,
      message : "login successful",
        user:{
          _id: user._id,
          name:user.name,
          email:user.email
        },
        token
     })
  } 
  
  
  catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in login",
    })
  }
 
}

 ///////////GET SINGLE USER///////////

export const getSingleUser= async(req,res)=>{

 try {

   const userID = req.params.id
  //  const data = await registerUser.findById(userID)
   const data = await registerUser.findOne({_id:userID})
     res.status(200).json({
      data:data,
      message:"Single User Data"     
     })
     console.log(data)

 } 
 
 catch (error) {
   res.status(400).json({
    message:error.message
   })
 }

}



