import assetDetail from '../model/assetDetail.model'
import multer from 'multer' 
import fs from 'fs'


const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
      cb(null, './uploads')
    },
    filename: function (req, file, cb) { 
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
      cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
  })
 export const upload = multer({ storage: storage })

    //  export const upload = multer({ dest: './uploads' }); 
    /////////////////////////////////////////////

  export const addAsset=(req,res)=>{
    try {
        console.log(req.body)
     const imageStore = multer({storage:storage}).single('pic')
    imageStore(req,res,(err)=>{
        if(err){
            res.status(400).json({
                message:err.message
            })
        } 

        else{
            const {fullName,model,serial} = req.body
               console.log(req.file)
            let img = ''
            if(req?.file?.filename){
                img = req.file.filename
            }
            console.log(img)
   
           const assetData = new assetDetail({
               fullName:fullName, 
               model:model,
               serial:serial,
               image:img
            })
           const saveData = assetData.save()
          
           if (assetData) {
            res.status(200).json({
                data:assetData,
                message:'Succesfully Data Created',
                 path: 'http://localhost:6001/uploads'
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

  //////////////////GET-ALL///////////////////////

  export const getAll = async (req,res)=>{
    
    try {
         const data = await assetDetail.find();
         
         res.status(200).json({
            data:data,
            message: "Successfully fetched!",
            path: 'http://localhost:6001/uploads'
         })
    } 
    catch (error) {
       res.status(400).json({
           message:error.message
       })
        }
        }
       
          /////////////GET-SINGLE////////////////////////   

       export const singleAsset = async(req,res)=>{
         try {
            const assetID = req.params.asset_id
            const data = await assetDetail.findOne({_id:assetID})
           if(data){
            res.status(200).json({
                data:data,
                message:"Single Asset Data",
                path: 'http://localhost:6001/uploads'
            })
           }
         } 
         
         catch (error) {
              res.status(401).json({
                message:error.message
              })
         }
          }


      ////////////////DELETE///////////////////////
export const deleteAsset= async (req,res)=>{
        try {
            const assetID = req.params.asset_id;
            const assetData = await assetDetail.findOne({_id:assetID})
            const data = await assetDetail.deleteOne({_id:assetID})
            if (data.acknowledged) {
                if(fs.existsSync('./uploads/'+assetData.image)){
                    fs.unlinkSync('./uploads/'+assetData.image)
                }

               res.status(200).json({
                  message: "Deleted Sucessfully"
               })
            }
        } 
        catch (error) {
            res.status(400).json({
                message:error.message
            })
        }
}

  ///////////////////Update//////////////////// 

  export const updateAsset =  (req,res)=>{
      try {
        console.log(req.body)
        const imageStore = multer({storage:storage}).single('pic')
       imageStore(req,res, async (err)=>{
        if (err) {
          return res.status(400).json({
            message:err.message
           })
        } 
         console.log(req.body,req.file)
          const assetID = req.params.asset_id
          const {fullName,serial,model} = req.body  
           
         const oldData = await assetDetail.findOne({_id:assetID}) 

          let img = oldData.image
          if(req?.file?.filename){
              img = req.file.filename 
              if(fs.existsSync('./uploads/'+oldData.image)){

                fs.unlinkSync('./uploads/'+oldData.image)
              }
          }
        
          console.log(img,'test')
          const editAsset = await assetDetail.updateOne({_id:assetID},{$set:{fullName:fullName,serial:serial,model:model, image:img}})

          if(editAsset.acknowledged){
              res.status(200).json({
                message:"Update Sucessful"
             })
             }
              else{
                res.status(400).json({
                  message:'Error in updating!'
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

