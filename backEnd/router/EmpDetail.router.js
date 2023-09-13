import { AddEmp,deleteEmp,getAllEmp, getSingleEmp, updateEmp } from "../controller/Employee.cont";
import express from 'express'

const empRouter = express.Router()
 
empRouter.post('/add-Employee',AddEmp)
empRouter.get('/get-employees',getAllEmp)
empRouter.get('/get-singleEmployee/:emp_id',getSingleEmp)
empRouter.delete('/delete-employee/:emp_id',deleteEmp)
empRouter.put('/update-employee/:emp_id',updateEmp)

export default empRouter








