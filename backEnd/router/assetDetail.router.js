import express from 'express'
import { addAsset,getAll,deleteAsset,upload,singleAsset,updateAsset } from '../controller/assetDetail.cont';
 
const assetrouter = express.Router()

assetrouter.post('/add-asset',addAsset)

assetrouter.get('/get-assets',getAll)

assetrouter.delete('/delete-asset/:asset_id',deleteAsset);

assetrouter.get('/get-SingleAsset/:asset_id',singleAsset)

assetrouter.put('/update-asset/:asset_id',updateAsset)

// assetrouter.post('/uploads', upload.single('file'), (req, res) => {
//     res.send('File uploaded successfully!');
//   });
  
  

export default assetrouter