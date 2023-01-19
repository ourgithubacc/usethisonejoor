// const Wishlist = require("../models/wishlist")
// const Product = require('../models/products')

// exports.addWish = async(req,res)=>{
//     try{
        
//         const product = await Product.findById(req.params.productId)
//         const wish = await new Wishlist({
//            product, addedAt: Date.now()
//         }).save();

//         res.status(200).json({
//             success: true,
//             data: wish
//         })

// } catch(error){
//     res.status(500).json({
//         success: false,
//         msg:'Internal Error Occured'
//     })
//     console.log(error)
// }

// }


// exports.getAllWishes = async (req,res)=>{
//     try{
//             const wishes = await Wishlist.find({});
//             res.json({
//                 count: wishes.length,
//                 success: true,
//                 data: wishes
//             })
        

//     } catch(error){
//         res.status(500).json({
//             success: false,
//             msg:'Internal Error Occured'
//         })
//         console.log(error)
//     }
// }

// exports.getWish = async (req,res) =>{
//     try {
//         const wish = await Wishlist.findById(req.params.wishId)
//         res.status(200).json({
//             success: true,
//             data: wish
//         })
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             msg:'Internal Error Occured'
//         })
//         console.log(error)
//     }
// }

// // exports.updateWish = async (req,res) =>{
// //     try {
// //         const _id = req.params.wishId
// //         const updateRequest = await Wishlist.findByIdAndUpdate(_id, req.body)
// //         res.status(200).json({
// //             success: true,
// //             data: updateRequest
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             msg:'Internal Error Occured'
// //         })
// //         console.log(error)
// //     }
// // }

// exports.deleteWish = async (req,res)=>{
//     try {
//         const wish = await Wishlist.findByIdAndDelete(req.params.wishId);
//         res.status(200).json({
//             success: true,
//             message:'Successfully Deleted',
//             data: wish
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             msg:'Internal Error Occured'
//         })
//         console.log(error)
//     }
// }
