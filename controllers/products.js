// // products controller
// const Product = require('../models/products')
// const User = require('../models/user')
// const $ = require('jquery')
// const regex = require('regex')


// const Imagetobase64 = require('image-to-base64')

// exports.addNewProduct = async (req, res, next) =>{
//     try {
//         const user = await User.findById(req.params.userId)
//         const {name, price, description, category, company, whatsapp, specifics, color} = req.body;
//         const base64Data = await Imagetobase64(req.files.image.path);
//         //const blob = new Blob([req.files.images])
//         //
//         //console.log(blob);
//         //console.log("base64Data", base64Data);

//         const product = await new Product({
//             name, price, description, category, company, whatsapp, specifics, color, user, image: `data:${req.files.image};base64,${base64Data}`, addedAt: Date.now()
//         }).save();

//         if(product) {
//             res.status(201).json({
//                 success:true,
//                 msg:"Successfully added new",
//                 data: product
//             })
//         } else {
//             res.status(400).json({
//                 success: false,
//                 msg:"Invalid product Data"
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             msg:"Internal Error"
//         })
//     }
// }

// exports.getAllProducts = async (req,res,next) =>{
//     try {
        

//         const size = req.params.pageSize;
//         const pageNo = req.params.pageNo;

//         var query = {};

//         if(pageNo < 0 || pageNo === 0){
//             return res.status(401).json({
//                 success: false,
//                 msg:'Invalid page number, should start with 1'
//             })
//         }

//         query.skip = size * (pageNo - 1);
//         query.limit = size;

//         const productCount = await Product.find({});
//         const product = await Product.find({})
//          .sort('-addedAt')
//          .populate({ path: 'category', select: ['_id', 'category_name'] })
//          .limit(Number(query.limit))
//          .skip(Number(query.skip))

//         res.json({
//             success: true,
//             count: productCount.length,
//             data: product
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             msg: 'Internal Error Occured'
//         })
//     }
// }


// exports.getProductById = async (req,res,next) =>{
//     try {
//         const product = await Product.findById(req.params.productId)
//          .sort('-addedAt')
//          .populate({ path: 'category', select: ['_id', 'category_name'] })

//          res.json({
//             success: true,
//             data: product
//          })
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             msg: 'Internal Error Occured'
//         })
//     }
// }

// exports.getProductByCategory = async (req,res,next) =>{
//     try {
//         const product = await Product.find({ category: req.params.catId })
//          .populate({ path: 'category', select: ['_id', 'category_name'] })

//          res.json({
//             success: true,
//             count: product.length,
//             data: product
//          }) 
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             msg: 'Internal Error Occured'
//         })
//     }
// }


// exports.deleteProductById = async (req,res,next) =>{
//     try {
//         const product = await Product.findByIdAndDelete(req.params.productId);
        

//         res.json({
//             success: true,
//             msg:"Successfully Deleted",
//             data: product
//         });

//         if(!product){
//             res.json({
//                 success: false,
//                 msg: "Product not found"
//             });
//         }
        
//     } catch (error) {
        
//             res.status(500).json({
//                 success: false,
//                 msg: 'Internal Error Occured'
//             })
//     }
// }



// exports.updateProductById = async (req,res,next) =>{
//     try {

        
//         const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
//             new: true,
//             runValidators: true
//         });
       

//         res.status(201).json({
//             success: true,
//             msg:"Successfully Updated",
//             data: product
//         });

//         if(!product){
//             res.status(401).json({
//                 success: false,
//                 msg: "Product not found"
//             });
//         }
        
//     } catch (error) {
//         console.log(error)
        
//         res.status(500).json({
//             success: false,
//             msg: 'Internal Error Occured'
//         })
//     }
// }

// exports.search = async (req,res,next) =>{
//     try{
//         const searchField = req.query.name
//         const product = await Product.find({name:{$regex: searchField, $options :'$i'}})
       


//         res.status(200).send(product)
//         next();
//     } catch(error){
//         console.log(error)
//         res.status(500).json({
//             "success": false,
//             "message": "Internal Error Occured"
//         })
//     }
// } 