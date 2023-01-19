const Host = require('../models/host')


 exports.addHost = async (req,res,next) =>{
    try {
        const { host_name } = req.body;

    const host = await Host.findOne({host_name: host_name});

    if(host){
        return res.status(401).json({
            success: false,
            msg: "Host already exist"
        })
    }

     const new_host = await new Host({ host_name}).save();

    res.status(201).json({
        success: true,
        msg:"Host created",
        data: new_host
    })
    } catch(error){
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
    
    
}

exports.getAllHosts = async (req,res,next) =>{
    try {
        const hosts = await Host.find({});
        res.json({
            success: true,
            data: hosts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
};

exports.deleteHostById = async (req,res,next) =>{
    try {
        const host = await Host.findByIdAndDelete(req.params.hostId);

        res.status(201).json({
            success: true,
            msg:"Successfully Deleted",
            data: host
        });

        if(!host){
            res.status(401).json({
                success: false,
                msg: "Host not found"
            });
        }
        
    } catch (error) {
        
            res.status(500).json({
                success: false,
                msg: 'Internal Error Occured'
            })
    }
}


exports.updateHostById = async (req,res,next) =>{
    try {
        const host = await Host.findByIdAndUpdate(req.params.hostId, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            success: true,
            msg:"Successfully Updated",
            data: host
        });

        if(!host){
            res.status(401).json({
                success: false,
                msg: "Host not found"
            });
        }
        
    } catch (error) {
        
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
};

