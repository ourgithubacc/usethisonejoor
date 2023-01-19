// const productCategory = require('../models/productCategory');

// // ADD CATEGORY

//  exports.addCategory = async (req,res,next) =>{
//     try {
//         const { category_name } = req.body;

//     const category = await productCategory.findOne({category_name: category_name});

//     if(category){
//         return res.status(401).json({
//             success: false,
//             msg: "Category already exist"
//         })
//     }

//      const new_category = await productCategory.create({ category_name});

//     res.status(201).json({
//         success: true,
//         msg:"Category created",
//         data: new_category
//     })
//     } catch(error){
//         res.status(500).json({
//             success: false,
//             msg: 'Internal Error Occured'
//         })
//     }
    
    
// }




// // @desc get all categories

// exports.getAllCategories = async (req,res,next) =>{
//     try {
//         const categories = await productCategory.find({});
//         res.json({
//             success: true,
//             data: categories
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             msg: 'Internal Error Occured'
//         })
//     }
// };


// // delete category

//  exports.deleteCategory = async (req,res,next) =>{
//     try {
//         const category = await productCategory.findByIdAndDelete(req.params.catID);

//         res.status(201).json({
//             success: true,
//             msg:"Successfully Deleted",
//             data: category
//         });

//         if(!category){
//             res.status(401).json({
//                 success: false,
//                 msg: "Category not found"
//             });
//         }
        
//     } catch (error) {
        
//             res.status(500).json({
//                 success: false,
//                 msg: 'Internal Error Occured'
//             })
//     }
// }


// // Update category

//  exports.updateCategory = async (req,res,next) =>{
//     try {
//         const category = await productCategory.findByIdAndUpdate(req.params.catID, req.body, {
//             new: true,
//             runValidators: true
//         });

//         res.status(201).json({
//             success: true,
//             msg:"Successfully Updated",
//             data: category
//         });

//         if(!category){
//             res.status(401).json({
//                 success: false,
//                 msg: "Category not found"
//             });
//         }
        
//     } catch (error) {
        
//         res.status(500).json({
//             success: false,
//             msg: 'Internal Error Occured'
//         })
//     }
// };


// // module.exports = {
// //     addCategory,
// //     getAllCategories,
// //     deleteCategory,
// //     updateCategory
// // }



