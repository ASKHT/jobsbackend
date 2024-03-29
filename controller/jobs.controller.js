const Jobs=require("../model/jobs.model")
const { StatusCodes } = require('http-status-codes');
const asyncHandler = require("express-async-handler");
const mongoose=require("mongoose");
const createjobs=(asyncHandler(async(req,res)=>{
    const {
           companyname,
           logourl,
           position,
           salary,
           jobtype,
           jobmode,
           location,
           jobdescription,
           aboutcompany,
           skills,
           information,
           
        } = req.body;
        // console.log(req.body)
        try {
            if(!companyname||!logourl||!position||!salary||!jobtype||!jobmode||!location||!jobdescription||!aboutcompany||!skills||!information)
                {
                    res.status(StatusCodes.BAD_REQUEST).json({message:"any of the field is missing"})
                }
                // const userId=req.userId;
                const job=await Jobs.create({
                    companyname:companyname,logourl:logourl,position:position,salary:salary,jobtype:jobtype,jobdescription:jobdescription,aboutcompany:aboutcompany,skills:skills,information:information,location:location,jobmode:jobmode
                })
                res.status(StatusCodes.OK).json({message:"job created sucessfully",job:job})

        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({message: error.message});
        }
// res.status(200).json({message:"job created succesfully"})

}))

//get job details by id

const getJobDetailsbyid=asyncHandler(async(req,res)=>{
    try {
         const {jobId} = req.params;
        //  console.log(jobId)
        if(!jobId){
            res.status(StatusCodes.NOT_FOUND).json({message:"please provide the jobid"})
        }
         const job=await Jobs.findOne({_id:jobId})
         res.status(StatusCodes.OK).json({message:"sucess",job:job})
    } catch (error) {
        res.status(StatusCodes.ERROR).json({message:error.message})
    }
})

//delete job by id if it is created by that user
const deletejobbyid = asyncHandler(async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Jobs.findOne({ _id: jobId });

        if (!job) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Job does not exist" });
        }

        // You can remove the userId check logic from here

        await Jobs.deleteOne({ _id: jobId });
        return res.status(StatusCodes.OK).json({ message: "Job deleted successfully" });

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
});


//update job by id logic go here

const updatejobbyid=asyncHandler(async(req,res)=>{
       try {
        const {jobId}=req.params
        // const userId=req.userId

        if(!jobId){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"please provide the userid"})
        }
        const isjobexists=await Jobs.findOne({_id:jobId})
        if(!isjobexists){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"job does not exist"})
        }
          const {
           companyname,
           logourl,
           position,
           salary,
           jobtype,
           jobmode,
           location,
           aboutcompany,
           skills,
        } = req.body;
        if(!companyname||!logourl||!position||!salary||!jobtype||!jobmode||!location||!aboutcompany||!skills)
             {
               res.status(StatusCodes.BAD_REQUEST).json({message:"any of the field is missing"})
              }
          await Jobs.updateOne(
            { _id: jobId },
            {
                $set: {
                        companyname,
                        logourl,
                        position,
                        salary,
                        jobtype,
                        jobmode,
                        location,
                        aboutcompany,
                        skills,
                },
            }
        );

        res.json({ message: "Job updated successfully" });
       } catch (error) {
          res.status(StatusCodes.BAD_GATEWAY).json({message:error.message})
       }
})

//get all jobs filter wise also

const getalldetails=asyncHandler(async(req,res)=>{
   try {
        const { title = "", skills } = req.query;
        // console.log(skills)
        const filter = {};
        if (title) {
            filter.title = new RegExp(title, "i");
        }
        if (skills && typeof skills === 'string') {
            const filteredSkills = skills.split(",").map(skill => skill.trim());
            filter.skills = { $in: filteredSkills };
        }
        // console.log(filter)
        const jobList = await Jobs.find(filter);

        res.json({ count:jobList.length,data: jobList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports={createjobs,getJobDetailsbyid,deletejobbyid, updatejobbyid,getalldetails}