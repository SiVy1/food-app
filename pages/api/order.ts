import type { NextApiRequest, NextApiResponse } from 'next'
const password = process.env.PASSWORD
let url = "mongodb+srv://SiVy:"+password+"@cluster0.11w0u.mongodb.net/?retryWrites=true&w=majority"
let mongoClient = require('mongodb').MongoClient
let dbname = 'foodapp'
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  mongoClient.connect(url, {}, (error: any, client: any) =>{
    let random = req.body.random
    let items = req.body.cartArray
    let sum = req.body.sum
    let location = req.body.data
    console.log(location)
    console.log(random, items)
    if(error) console.log(error)
    const db = client.db(dbname)
    db.collection('orders').insertOne({
        oid: `${random}`,
        sum: sum,
        location,
        items
    })
  })
}