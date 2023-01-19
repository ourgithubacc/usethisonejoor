const News = require('../models/news')
const cloudinary = require('../controllers/cloudinary')
const upload = require('../controllers/multer')
const fs = require('fs')



//@desc -> add news
exports.addNews = async (req, res) =>{
    try {
        upload.array('newsImage') 
        const uploader = async (path) => await cloudinary.uploads(path,'Images')

        if(req.method === 'POST'){
         
            const urls = []
            let url;
      
            const files = req.files.newsImage
        if (files.length > 1){
           
        
              console.log(files.length)
  
            for(const file of files){
                const { path } = file
          
          
                const newPath = await uploader(path)
          
          
                urls.push(newPath)
          
                fs.unlinkSync(path)
              }
        } else{
            
            const { path } = req.files.newsImage
          
          
            const newPath = await uploader(path)
      
            url = newPath
            
            //urls.push(newPath)
      
            //fs.unlinkSync(path)
        }
         
          const {title,category, campus} = req.body;
          const news = await new News({
            title, category, campus, data: urls , data: url, addedAt: Date.now()
        }).save();
      
        if(news) {
            res.status(201).json({
                success:true,
                msg:"Successfully added new",
                data: news
            })
          }
    
        } else{
          res.status(405).json({
            err: 'News not Uploaded succesfully'
          })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg:"Internal Error"
        })
    }
}
//@desc fetch all news

exports.getAllNews = async (req,res,next) =>{
    try {
        const size = req.params.pageSize;
        const pageNo = req.params.pageNo;

        var query = {};

        if(pageNo < 0 || pageNo === 0){
            return res.status(401).json({
                success: false,
                msg:'Invalid page number, should start with 1'
            })
        }

        query.skip = size * (pageNo - 1);
        query.limit = size;

    
        const news = await News.find({})
         .sort('-addedAt')
         .populate({ path: 'category', select: ['_id', 'category_name'] })
         .limit(Number(query.limit))
         .skip(Number(query.skip))
        
        res.json({
            success: true,
            count: news.length,
            data: news
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
}

exports.getNewsById = async (req,res,next) =>{
    try {
        const news = await News.findById(req.params.newsId)
         .sort('-addedAt')
         .populate({ path: 'category', select: ['_id', 'category_name'] })

         res.json({
            success: true,
            data: news
         })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
}

exports.getMainCampusNews = async (req,res, next)=>{
    try{
        const news = await News.find({campus: 'Main'})
    .sort('-addedAt')
    .populate({ path: 'category', select: ['_id', 'category_name'] })

    
    res.status(200).json({
        count: news.length,
        data: news
    })
    
} catch(error){
    console.log(error)
    res.status(500).json({
        success: false,
        msg: "Internal Error Ocurred"
    })
}
}


exports.getIperuCampusNews = async (req,res, next)=>{
    try{
    const news = await News.find({campus: 'Iperu'})
    .sort('-addedAt')
    .populate({ path: 'category', select: ['_id', 'category_name'] })

        res.status(200).json({
            count: news.length,
            data: news
        })
    
} catch(error){
    res.status(500).json({
        success: false,
        msg: "Internal Error Ocurred"
    })
}
}
// getSliderNews
exports.getSliderNews = async (req,res,next) =>{
    try {
        const news = await News.find({ addToSlider: true })
         .populate({ path: 'category', select: ['_id', 'category_name'] })

         res.json({
            success: true,
            count: news.length,
            data: news
         })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
}

exports.getNewsByCategory = async (req,res,next) =>{
    try {
        const news = await News.find({ category: req.params.catId })
         .populate({ path: 'category', select: ['_id', 'category_name'] })

         res.json({
            success: true,
            count: news.length,
            data: news
         }) 
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
}

exports.deleteNewsById = async (req,res,next) =>{
    try {
        const news = await News.findByIdAndDelete(req.params.newsId);
        

        res.json({
            success: true,
            msg:"Successfully Deleted",
            data: news
        });

        if(!news){
            res.json({
                success: false,
                msg: "News not found"
            });
        }
        
    } catch (error) {
        
            res.status(500).json({
                success: false,
                msg: 'Internal Error Occured'
            })
    }
}

exports.updateNewsById = async (req,res,next) =>{
    try {

        
        const news = await News.findByIdAndUpdate(req.params.newsId, req.body, {
            new: true,
            runValidators: true
        });
       

        res.status(201).json({
            success: true,
            msg:"Successfully Updated",
            data: news
        });

        if(!news){
            res.status(401).json({
                success: false,
                msg: "News not found"
            });
        }
        
    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
}








