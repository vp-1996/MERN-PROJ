import EmpDetail from "../model/Employee.model";
import multer from "multer";
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
      cb(null, './uploads/EmpPics')
    },
    filename: function (req, file, cb) { 
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
      cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
  })
 export const upload = multer({ storage: storage })

/////////////ADD EMP/////////////////////

export const AddEmp=(req,res)=>{
   try {
    console.log(req.body)
   
    const imageStore = multer({storage:storage}).single('image')
    imageStore(req,res,(err)=>{
       if (err) {
         res.status(400).json({
            message: err.message
         })
       }

         else{
           const {fullName,email,EmpID,designation,manager,date} = req.body
           console.log(req.file)
          
             let img = ''
        if (req?.file?.filename) {
            img= req.file.filename
        }
         console.log(img)

         const EmpData = new EmpDetail({
            fullName : fullName,
            email : email,
            EmpID: EmpID,
            designation:designation,
            manager:manager,
            date: date,
            image:img
         })
           const saveData= EmpData.save()
 
             if (EmpData) {
                res.status(200).json({
                    message:"Employee Data Added Successfully",
                    path: 'http://localhost:6001/uploads/EmpPics'
                })
             }
         }
     })
   } 
   
   catch (error) {
    res.status(400).json({
        message:error.message
    })

   }   
}

   //////////GET ALL EMPLOYEES////////////////////

export const getAllEmp = async (req,res)=>{
  try {

      const data = await EmpDetail.find();  
      res.status(200).json({
        data:data,
        message:'Employees Data Sucessfully fetched',
        path: 'http://localhost:6001/uploads/EmpPics'
      })
  } 
  
  catch (error) {
    res.status(400).json({
      message:error.message
    })
  }  
}

//////////////DELETE//////////////////////

export const deleteEmp =  async(req,res)=>{
  try {
   const empID =  req.params.emp_id
   const empData = await EmpDetail.findOne({_id:empID})
   const data = await EmpDetail.deleteOne({_id:empID})
        // console.log(data)
   if (data. acknowledged) { 
       if (fs.existsSync('./uploads/EmpPics/'+empData.image)) {
          fs.unlinkSync('./uploads/EmpPics/'+empData.image)
       }

      res.status(200).json({
        message:"Deleted sucessfully"
      })
   } 
    
  } 
  
  catch (error) {
    res.status(400).json({
      message:error.message
    })
  }
  
    }

/////////////GET SINGLE//////////////////

export const getSingleEmp= async (req,res)=>{
try {
   const empID = req.params.emp_id
  const data = await EmpDetail.findById(empID)
   res.status(200).json({
    data:data,
    message:"Single Employee Data",
    path:"http://localhost:6001/uploads/EmpPics/"
   })

} 

catch (error) {
        res.status(400).json({
          message:error.message
        })
}
}

////////////////UPDATE///////////////////////

export const updateEmp = (req,res)=>{

try {
  console.log(req.body)
  const imageStore = multer({storage:storage}).single('image')
   imageStore(req,res,async(err)=>{
       if (err) {
        return res.status(400).json({
          message:err.message
        })
       }
      console.log(req.body,req.file)

      const empID = req.params.emp_id
      const {fullName,email,EmpID,designation,manager,date}= req.body

      const oldData = await EmpDetail.findOne({_id:empID})

      let img = oldData.image
     if (req?.file?.filename) {
         img = req.file.filename
         if (fs.existsSync('./uploads/EmpPics/'+oldData.image)) {
           fs.unlinkSync(`./uploads/EmpPics/${oldData.image}`)
         }
     }

     const editEmp = await EmpDetail.updateOne({_id:empID},{$set:{fullName:fullName,email:email,EmpID:EmpID,designation:designation,manager:manager,date:date,image:img}})

       if (editEmp.acknowledged) {
          res.status(200).json({
            message:"Update Sucessfull"
          })
       }
       else{
        res.status(400).json({
          message:"Error in updating"
        })
       }

   })
} 

catch (error) {
  res.status(400).json({
    message:error.message
  })
}

}











