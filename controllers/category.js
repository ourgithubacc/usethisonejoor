const Category = require('../models/category');

// ADD CATEGORY

 exports.addCategory = async (req,res,next) =>{
    try {
        const { category_name } = req.body;

    const category = await Category.findOne({category_name: category_name});

    if(category){
        return res.status(401).json({
            success: false,
            msg: "Category already exist"
        })
    }

     const new_category = await new Category({ category_name}).save();

    res.status(201).json({
        success: true,
        msg:"Category created",
        data: new_category
    })
    } catch(error){
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
    
    
}




// @desc get all categories

exports.getAllCategories = async (req,res,next) =>{
    try {
        const categories = await Category.find({});
        res.json({
            success: true,
            data: categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
};


// delete category

 exports.deleteCategory = async (req,res,next) =>{
    try {
        const category = await Category.findByIdAndDelete(req.params.catID);

        res.status(201).json({
            success: true,
            msg:"Successfully Deleted",
            data: category
        });

        if(!category){
            res.status(401).json({
                success: false,
                msg: "Category not found"
            });
        }
        
    } catch (error) {
        
            res.status(500).json({
                success: false,
                msg: 'Internal Error Occured'
            })
    }
}


// Update category

 exports.updateCategory = async (req,res,next) =>{
    try {
        const category = await Category.findByIdAndUpdate(req.params.catID, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            success: true,
            msg:"Successfully Updated",
            data: category
        });

        if(!category){
            res.status(401).json({
                success: false,
                msg: "Category not found"
            });
        }
        
    } catch (error) {
        
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
};


// module.exports = {
//     addCategory,
//     getAllCategories,
//     deleteCategory,
//     updateCategory
// }



