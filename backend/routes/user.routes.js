import {Router} from "express";
import { register, UploadProfilePicture, downloadProfile, updateProfilePicture, getUserProfile, updateProfileData, getAllUserProfile, sendConnectionRequest, getMyConnectionRequests, whatAreMyConnections, acceptConnectionRequest } from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";
import multer from 'multer';


const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

router.route("/update_profile_picture").post(upload.single('profile_picture'), UploadProfilePicture);

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/user_update").post(updateProfilePicture);

router.route("/get_user_and_profile").get(getUserProfile);
router.route("/update_profile_data").post(updateProfileData);
router.route("/users/get_all_profile").get(getAllUserProfile);
router.route("/users/download_resume").get(downloadProfile);
router.route("/users/send_connection_request").post(sendConnectionRequest);
router.route("/users/getConnectionRequest").get(getMyConnectionRequests);
router.route("/users/user_connection_request").get(whatAreMyConnections);
router.route("/users/accept_connection_request").post(acceptConnectionRequest);



export default router;