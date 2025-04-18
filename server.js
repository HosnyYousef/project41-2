const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3131
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'workoutProgram'


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
    db.collection('workouts').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addWorkout/muscle/workout', (request, response) => {
    db.collection('workouts').insertOne({exercise: request.body.exercise,
    workout: request.body.workout,
    group: request.body.group,
    sets: request.body.sets,
    reps: request.body.reps,
    difficulty: request.body.difficulty,
    likes: 0
})
    .then(result => {
        console.log('workout Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('workouts').updateOne({exercise: request.body.exerciseS, 
        workout: request.body.workoutS, 
        group: request.body.groupS,
        sets: request.body.setsS,
        reps: request.body.repsS,
        difficulty: request.body.difficultyS,
        likes: request.body.likesS
    },{
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

app.delete('/deleteworkout', (request, response) => {
    db.collection('workouts').deleteOne({exercise: request.body.exerciseS})
    .then(result => {
        console.log('workout Deleted')
        response.json('workout Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

