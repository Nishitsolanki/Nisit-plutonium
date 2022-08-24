const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publishModel = require("../models/pubalisherModel")


const createBook = async function (req, res) {
    let book = req.body
    let a = await authorModel.findById(book.author)
    let b = await publishModel.findById(book.publisher)
    if (!book.author) { return res.send({ error: "author detail is required" }) }
    else if (!a) { return res.send({ error: "author id doesn't match" }) }
    else if (!book.publisher) { return res.send({ error: "publisher detail is required" }) }
    else if (!b) { return res.send({ error: "publisher id doesn't match" }) }
    let bookCreated = await bookModel.create(book)
    return res.send({ data: bookCreated })
}


const listOfAll= async function (req, res){
    let wholeDetail= await bookModel.find().populate(['author','publisher'])
    res.send({list:wholeDetail})
}


const getdata= async function (req, res) {
    let allBooks= await publishModel.find({name:{$in:["HarperCollins","penguin"]}})
    let kitab = await bookModel.updateMany({publisher:allBooks},{$set:{isHardCover:true}})
    let authorbooks= await authorModel.find({rating:{$gt:3.5}})
    let updateprice= await bookModel.updateMany({author:authorbooks},{$inc:{price:+10}})
     res.send ({MSG:[kitab,updateprice]})
   
}
module.exports.getdata=getdata
module.exports.createBook = createBook
module.exports.listOfAll = listOfAll


    














// const createBook = async function (req, res) {

//     let data = req.body
//     if (data.author) { 
//         const check = await authorModel.findById(data.author)
//         if (check) {
//             if (data.publisher) {
//                 const check = await publishModel.findById(data.publisher)
//                 if (check) {
//                     let createdBook = await bookModel.create(data)
//                     res.send({ msg: createdBook })
//                 } else res.send("Please enter correct publisher id")

//             } else res.send("Please enter publisher id")
//         } else res.send("Please enter correct author id")

//     } else res.send("Please enter author id")
// }


// if(book.author===undefined) return res.send({error:"author detail is required"})
//     let a= await authorModel.find({_id:book.author})
//     if(a) return res.send({error:"author id doesn't match"})
//     let bookCreated = await bookModel.create(book)
//     return  res.send({data: bookCreated})  






// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate('author_id')
//     res.send({data: specificBook})