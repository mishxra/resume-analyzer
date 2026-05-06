import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({                                        //diskstorage: Saves file to my local folder temporarily
      destination: function(req,file,cb){
        cb(null, './public/temp')                                          // destination: public/temp
      },
      filename: function(req,file,cb){                                    // filename: Renames file to current timestamp to avoid conflicts
        cb(null,Date.now()+ path.extname(file.originalname))
      }
})

const fileFilter = (req,file,cb)=>{                                       //fileFilter: Only allows PDF files, rejects everything else
    if(file.mimetype == "application/pdf"){
        cb(null, true)
    }else{
        cb(new Error("Only PDF is allowed"),false)
    }
}

const upload= multer({
    storage,
    fileFilter,                                                      //max file size is 5mb
    limits:{
        filesize: 5*1024*1024
    }
})

export { upload }