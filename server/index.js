const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const path = require('path')
const fs = require('fs')
const cors = require('cors')


const PORT = 5000

app.use(cors())
app.use(express.json())

app.ws('/', (ws, req) => {
    
    
    ws.send(JSON.stringify({message: 'Сервер говорит тебе привет!'}))
    ws.on('message', (msg) => {
        
        const message = JSON.parse(msg)
        
        switch (message.method) {
            case 'connection':
                connectionHandler(ws, message)
                break;
            case 'draw':
                broadcastHandler(ws, message)
                break;
                case 'finish':
                broadcastHandler(ws, message)
            default:
                break;
        }
        
    })
})

function connectionHandler(ws, message) {
    ws.id = message.id.id
    // console.log(message.id.id);
    
    broadcastHandler(ws, message)
    
}

function broadcastHandler(ws, msg) {
    // console.log(ws.id);
    
    aWss.clients.forEach(client => {
        if(client.id === ws.id) {
            
            client.send(JSON.stringify(msg))
            
        }
    })
}

app.post('/image', (req, res) => {
    // console.log(req.body.img);
    try {
        const data = req.body.img.replace('data:image/png;base64,', '')
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
        res.send(201).json({message: 'downloaded'})
    } catch (error) {
        res.send(500).json({message: 'something went wrong'})
    }
    
})

app.get('/image', (req, res) => {
    try {
        const picture = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
        const response = 'data:image/png;base64,' + picture.toString('base64')
        res.json({image: response})
    } catch (error) {
        console.log(error);
        
    }
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    
})

