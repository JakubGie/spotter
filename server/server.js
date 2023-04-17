const express = require('express')
const mongoose = require('mongoose')
const Spotted = require('./models/spotted')
const Spot = require('./models/spot')
require('dotenv').config()


const dbURI = process.env.DB_URI

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db')
        app.listen(5000, () => {
            console.log('server is running')
        })
    })
    .catch((err) => {
        console.log(err)
    })


const app = express()


function getId(name) {
    return new Promise((resolve, reject) => {
        Spotted.find( { username: name } ).then((result) => {
            result.map( (data) => {
                //res.send(data._id)
                const id = data.id
                resolve(id)
              });
        })
    })
}

function getName(id) {
    return new Promise((resolve, reject) => {
        Spotted.find( { _id: id } ).then((result) => {
            result.map( (data) => {
                //res.send(data._id)
                const id = data.name
                resolve(name)
              });
        })
    })
}

function howManySpots(id) {
    return new Promise((resolve, reject) => {
        Spot.count({spotted: id}).then((result) => {
            resolve(result)
        })
    })
}

function howManyAllSpots() {
    return new Promise((resolve, reject) => {
        Spot.count().then((result) => {
            resolve(result)
        })
    })
}

app.get('/add-spotted', (req, res) => {
    const spotted = new Spotted({
        name: 'Warszawa',
        username: 'warszawa',
        desc: 'witaj na spotted warsszawa'
    })

    spotted.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
})

app.get('/api/search/:string', (req, res) => {
    var string = req.params.string

    string = string.replace('spotted', '')
    string = string.replace('Spotted', '')
    string = string.replace('spoted', '')
    string = string.replace('Spoted', '')
    string = string.trimStart()
  

    Spotted.find( { $or: [{ "name" : { $regex: string, $options: 'i' } }, { "username" : { $regex: string, $options: 'i' } }] }   ).limit(30).then((result) => {
        res.send(result)
    })
})

app.use(express.json())

function addSpot(id, body) {
    return new Promise((resolve, reject) => {
        const spot = new Spot({
            spotted: id,
            content: body,
            likes: 0
        })

        spot.save().then((result) => {
            resolve(result)
        }).catch((err) => {
            console.log(err)
        })
    })
}

function addSpotted(name, username, body) {
    return new Promise((resolve, reject) => {
        const spotted = new Spotted({
            name: name,
            username: username,
            desc: body
        })

        spotted.save().then((result) => {
            resolve(result)
        }).catch((err) => {
            console.log(err)
        })
    })
}

app.post('/api/add-spotted', (req, res) => {

    async function doWork()
    {
        const name = req.body.spottedName
        const username = req.body.spottedUsername
        const body = req.body.spottedBody

        const addSpottedRes = await addSpotted(name, username, body)

        res.send(addSpottedRes)
    }

    doWork()
})

app.post('/api/add-spot/:name', (req, res) => {
    const name = req.params.name
    

    async function doWork()
    {
        const id = await getId(name)
        const body = req.body.spotBody
        const addSpotRes = await addSpot(id, body)
        res.send(addSpotRes)
    }

    doWork()
})

app.get('/api', (req, res) => {
    res.json()
})

app.get('/api/allSpotteds', (req, res) => {
    Spotted.find().then((result) => {
        res.send(result)
    })
})

app.get('/api/getSpottedInfo/:username', (req, res) => {
    const username = req.params.username

    

    Spotted.find( { username: username } ).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.json(400, { error: "invalid key" })
    })

    
})

app.get('/api/getId/:name', (req, res) => {
    const name = req.params.name

    Spotted.find( { username: name } ).then((result) => {
        result.map( (data) => {
            res.send(data._id)
          });
        
    }).catch((err) => {
        res.send('error')
    })
})

app.get('/api/getName/:id', (req, res) => {
    const id = req.params.id

    Spotted.find( { _id : id } ).then((result) => {
        result.map( (data) => {
            res.json(data)
          });
        
    }).catch((err) => {
        res.send('error')
    })
})


app.get('/api/howManySpots/:name', (req, res) => {
    const name = req.params.name

    if(name!="all") {
        async function doWork()
        {
            const id = await getId(name)
            const results = await howManySpots(id)
            res.send(''+results)
        }
    
        doWork()
    } else {
        async function doWork()
        {
            const results = await howManyAllSpots()
            res.send(''+results)
        }
    
        doWork()
    }
    
   
})

app.get('/api/getSpots/:id/:limit', (req, res) => {
    const name = req.params.id
    const limit = req.params.limit

    if(name=="all") {
        Spot.find().sort({createdAt: -1}).limit(limit).then((result) => {
            res.send(result)
        })
    }

    

    function spotsRes(id) {
        return new Promise((resolve, reject) => {
            Spot.find( { spotted: id } ).sort({createdAt: -1}).limit(limit).then((result) => {
                resolve(result)
            })
        })
    }
    
    async function doWork() {
        const id = await getId(name)

        const data = await spotsRes(id)

        res.send(data)
    }
  
    doWork()
   

    

    
})

