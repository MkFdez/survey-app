const multer = require('multer');
const path = require('path');
const fs = require('fs')
const uploadRouter = require('express').Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("first")
      if(!fs.existsSync(`public/uploads/${req.body.id}`)){
        console.log("here")
        fs.mkdirSync(`public/uploads/${req.body.id}`,{recursive: true}, (err)=> {
          console.log("error making dir")
          console.log(err)
        })
      }
      cb(null, `public/uploads/${req.body.id}`); // Specify the directory where images will be stored
    },
    filename: (req, file, cb) => {
      
      const fileName = `${Date.now()}_${file.originalname}`;
      cb(null, fileName); // Set the file name to be unique
    },
  });
  
  // Initialize multer upload
  const upload = multer({ storage });
  
  // Define the route for image uploading
  uploadRouter.post('/', upload.single('image'), (req, res) => {
    console.log("in uploads")
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    
    // Get the file path of the uploaded image
    const temp = req.file.path.split(`\\`)
    console.log(req.file.path)
    console.log(temp)
    const final_path = req.file.path
    return res.status(200).json({ final_path });
  });

module.exports = uploadRouter