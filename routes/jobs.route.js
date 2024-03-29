const {createjobs,getJobDetailsbyid,deletejobbyid,updatejobbyid,getalldetails}=require("../controller/jobs.controller")
const express=require("express")
const router=express.Router();
const {verifyuser}=require("../middleware/Authenticate")

router.route("/createjobs").post(verifyuser,createjobs)
router.route("/jobdetails/:jobId").get(getJobDetailsbyid)
router.route("/deletejob/:jobId").delete(verifyuser,deletejobbyid)
router.route("/updatejob/:jobId").put(verifyuser,updatejobbyid)
router.route("/all").get(getalldetails)
module.exports=router;