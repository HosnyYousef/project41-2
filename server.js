const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3131
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'filmDevice'


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',(request, response)=>{ //just like a click event
    db.collection('devices').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addDevice', (request, response) => {
    db.collection('devices').insertOne({title: request.body.title,
    device: request.body.device, genre: request.body.genre, likes: 0})
    .then(result => {
        console.log('Device Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('devices').updateOne({title: request.body.titleS, device: request.body.deviceS, genre: request.body.genreS,likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteDevice', (request, response) => {
    db.collection('devices').deleteOne({title: request.body.titleS})
    .then(result => {
        console.log('Device Deleted')
        response.json('Device Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

