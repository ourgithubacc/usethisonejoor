const Ref = require('../models/reference')


exports.getAllReference = async (req,res) =>{
    try{
        const ref = await Ref.find({})

        res.status(200).json({
            "success": true,
            "data": ref
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            "success": false,
            "data": error
        })
    }
    
    
}

exports.getReferenceById = async (req,res) => {
    try{
            const ref = await Ref.findById(req.params.refId)

            res.status(200).json({
                "success": true,
                "data": ref
            })
    } catch (error){
            res.status(500).json({
                "success": false,
                "data": error
            })
    }
   

}