const cloudinary = require('cloudinary');


// Configuration 
cloudinary.config({
  cloud_name: "dnq3yedfq",
  api_key: "967819711343768",
  api_secret: "yCPsIkKzSvBcGIzX4jUp5JoI7_M"
});


exports.uploads = (file, folder) =>{
    return new Promise(resolve =>{
        cloudinary.uploader.upload(file, (result) =>{
            resolve({
                url:result.url,
                id: result.public_id
            })
        },{
            resource_type: "auto",
            folder: folder
        })
    })
}

