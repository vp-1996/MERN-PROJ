import  express  from "express";
import { register,login, getSingleUser} from "../controller/regUser.cont";

const userRouter = express.Router() 

userRouter.post('/register-user',register)
userRouter.post('/login',login)
 userRouter.get('/get-singleUser/:id',getSingleUser)

export default userRouter





