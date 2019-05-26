
exports.validateUpload=(req,res,next)=>{
    if(!req.file.photo){// File does not exist
        res.status(400).json({
            status:400,
            errors:"File failed to upload"
        })
    }

    if(req.file.photo.truncated){ // The file was determined to be too large
        res.status(400).json({
            status:400,
            errors:"File to large"
        })
    }

}

/*
Router Usage 
app.post('/',multer({
    dest:'./uploads/',
    rename:(field,filename)=>{
        filename=filename.replace(/\W+/g, '-').toLowerCase();
        return filename+'_'+Date.now();
    },
    limits:{
        files:1,
        fileSize:2*1024*1024 //2MBs in bytes
    }
}),validateUpload,(req,res)=>{

})


and get the storage path like req.files.photo.path to commit to mongoose schema
we use req.files.__fieldname and req.body.__fieldname for other fields
*/