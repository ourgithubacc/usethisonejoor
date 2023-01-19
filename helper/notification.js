// const { initializeApp } = require('firebase-admin/app');
// const admin = require('firebase-admin')

// require('dotenv').config()
//  const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// exports.sendNotification = async (notificationTitle, Subtitle) =>{
//     const notification ={
//         title: notificationTitle,
//         text: Subtitle
//     };

//     const fcm_tokens = [];

//     const notification_body ={
//         'notification': notification,
//         'registration_ids': fcm_tokens
//     }

//     fetch(`https://fcm.googleapis.com/fcm/send`,{
//         'method': 'POST',
//         'headers':{
//             'Authorization': 'key='+ process.env.FIREBASE_SERVERKEY,
//             'Content-Type': 'application/json'
//         },
//         'body':JSON.stringify(notification_body)
//     })
// };

// var FCM = require('fcm-node');
// var serverKey = process.env.FIREBASE_SERVERKEY;
// var fcm = new FCM(serverKey);

// var message = {
// to:'<DEVICE_TOKEN>',
//     notification: {
//         title: 'NotifcatioTestAPP',
//         body: '{"Message from node js app"}',
//     },

//     data: { //you can send only notification or only data(or include both)
//         title: 'ok cdfsdsdfsd',
//         body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
//     }

// };

// fcm.send(message, function(err, response) {
//     if (err) {
//         console.log("Something has gone wrong!"+err);
//         console.log("Respponse:! "+response);
//     } else {
//         // showToast("Successfully sent with response");
//         console.log("Successfully sent with response: ", response);
//     }

// });







const DeviceSchema = require('../models/notification')
const apns = require('apns');
const gcm = require('node-gcm');
exports.registerDevice = async (req,res, next) =>{
    let body = JSON.parse(req.body);

    if (body) {
        let newDevice = new DeviceSchema(body);
        newDevice.save(err => {
            if (!err) {
                res.send(200);
            } else {
                res.send(500);
            }
        })
    }
}


exports.getDevices = async (req,res) =>{
    DeviceSchema.find( (err, devices) => {
        if (!err && devices) {
            let androidDevices = [];
            devices.forEach(device => {
                if (device.platform === 'ios') {
                    sendIos(device.deviceId);
                } else if (device.platform === 'android') {
                    androidDevices.push(device.deviceId);
                }
            });
            sendAndroid(androidDevices);
            res.send(200);
        } else {
            res.send(500);
        }
    });
}


const options = {
    keyFile  : 'key.pem',
    certFile : 'cert.pem',
    debug    : true,
    gateway  : 'gateway.sandbox.push.apple.com',
    errorCallback : function(num, err) {
        console.error(err);
    }
};

exports.sendIos = (deviceId) => {
    let connection = new apns.Connection(options);

    let notification = new apns.Notification();
    notification.device = new apns.Device(deviceId);
    notification.alert = 'Hello World !';

    connection.sendNotification(notification);
}


exports.sendAndroid = (devices) => {
    let message = new gcm.Message({
        notification : {
            title : 'Hello, World!'
        }
    });

    let sender = new gcm.sender('<YOUR_API_KEY_HERE>');

    sender.send(message, {
        registrationTokens : devices
    }, function(err, response) {
        if (err) {
            console.error(err);
        } else {
            console.log(response);
        }
    });

}