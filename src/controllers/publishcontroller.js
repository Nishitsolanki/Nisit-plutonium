const publishModel = require("../models/pubalisherModel")

const createpublisher= async function (req, res) {
    let publish = req.body
    let publishCreated = await publishModel.create(publish)
    res.send({data: publishCreated})
}
// const  kitab = async function(req,res){
//     let kapi = await publishModel.find({})
//     console.log(kapi)
//     res.send({data:kapi})
// }

//module.exports.kitab=kitab
module.exports.createpublisher=createpublisher