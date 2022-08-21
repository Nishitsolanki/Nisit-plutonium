const { count } = require("console")
const BookModel= require("../models/bookModel")
const authormodel = require("../models/authormodel")


const createAuthor = async function (req, res) {
    let data = req.body
    let savedData = await authormodel.create(data)
    res.send({ msg: savedData })
}

const createBook = async function (req, res) {
    let data = req.body
    let savedData = await BookModel.create(data)
    res.send({ msg: savedData })
}

// 1 List the books written by "Chetan Bhagat" ( this will need 2 DB queries one after another
// first query will find the authorid for Chetan Bhagat 
//Then next query will get the list of books with that author_id )
const getBooksData = async function (req, res) {
    let authors = await authormodel.find({ author_name : "Chetan Bhagat"})
    let bookid = await BookModel.find({ author_id  : { $eq : authors[0].author_id}})
    res.send( { msg  : bookid })  
}

// 2 find the author of “Two states” and update the book price to 100
//Send back the author_name and updated price in response. 
// ( This will also need 2  queries- 1st will be a findOneAndUpdate. 
//The second will be a find query aith author_id from previous query

const findauthor = async function (req, res) {
    let bookprice = await BookModel.findOneAndUpdate(
        { name: "Two states"} , //condition
        {  price : 100 }, //update in data
        { new: true}  // , upsert: true
    )
     let updateprice = bookprice.price;
     let authorupdate = await authormodel.find({author_id: { $eq : bookprice.author_id}}).select({author_name : 1, _id : 0})
     res.send({msg : authorupdate , updateprice })
}

// 3rd Find the books which costs between 50-100(50,100 inclusive) 
//and respond back with the author names of respective books.. 

const findBooks = async function (req, res) {
    
let allBooks = await BookModel.find({   price : {$gte: 50, $lte: 100}})
let store = allBooks.map( x => x.author_id);
let  NewBooks = await authormodel.find({author_id : store}).select({author_name : 1, _id : 0})
res.send(NewBooks)

}



// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )
     
//      res.send( { msg: allBooks})
// }

// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }




// // CRUD OPERATIONS:
// // CREATE
// // READ
// // UPDATE
// // DELETE



module.exports.createAuthor = createAuthor
//
module.exports.createBook = createBook

// 
module.exports.getBooksData = getBooksData

//
module.exports.findauthor =findauthor

//
module.exports.findBooks = findBooks