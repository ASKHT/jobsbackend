const mongoose=require('mongoose');
const User=require("./user.model")

const JobsSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, 'Company name is required'],
    },
    logourl: {
        type: String,
        required: [true, 'Logo URL is required'],
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
    },
    salary: {
        type: String,
        required: [true, 'Salary is required'],
    },
    jobtype: {
        type: String,
        required: [true, 'Job type is required'],
    },
    jobmode: {
        type: String,
        required: [true, 'Job mode is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    jobdescription: {
        type: String,
        required: [true, 'Job description is required'],
    },
    aboutcompany: {
        type: String,
        required: [true, 'About company is required'],
    },
    skills: {
        type: [String],
        required: [true, 'Skills are required'],
    },
    information: {
        type: String,
        required: [true, 'Information is required'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

const Jobs = mongoose.model('Jobs', JobsSchema);
module.exports=Jobs
