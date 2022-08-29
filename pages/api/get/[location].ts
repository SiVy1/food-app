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
    const {location} = req.query
    console.log(location)
    if(error) console.log(error)
    const db = client.db(dbname)
    db.collection('locations').find({ location: location}).toArray((err: any, result: any) => {
      res.send(result)
    })
  }) 
} 