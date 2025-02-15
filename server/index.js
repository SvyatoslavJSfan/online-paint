const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const path = require('path')
const fs = require('fs')
const cors = require('cors')


const PORT = 5000

app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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
                break;
            case 'updateUndoList':
                broadcastHandler(ws, message)
            case 'updateRedoList':
                broadcastHandler(ws, message)
            case 'redo':
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
    // console.log('body: ', req.body);
    try {
        const data = req.body.img.replace('data:image/png;base64,', '')
        
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
        
        res.send(201).json({message: 'downloaded'})
    } catch (error) {
        res.send(500).json({message: 'something went wrong'})
    }
    
})

app.post('/undo', (req, res) => {
    try {
        const data = req.body.undos
        fs.writeFileSync(path.resolve(__dirname, 'undos', `${req.query.id}.txt`), data)
        res.send(201).json({message: 'undos written'})
    } catch (error) {
        res.send(500).json({message: 'error posting undo list'})
    }
})

app.post('/redo', (req, res) => {
    try {
        const data = req.body.redos
        console.log('redos:.....', req.query.id);
        
        fs.writeFileSync(path.resolve(__dirname, 'redos', `${req.query.id}.txt`), data)
        res.send(201).json({message: 'redos written'})
    } catch (error) {
        res.send(500).json({message: 'error posting redo list'})
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

app.get('/undo', (req, res) => {
    try {
        const undoList = fs.readFileSync(path.resolve(__dirname, 'undos', `${req.query.id}.txt`), 'utf-8')
        if (undoList) {
            res.json({undos: undoList})
        }
        res.json({undos: '[]'})
    } catch (error) {
        console.log(error);
        res.json({message: 'error getting undo list'})
    }
})

app.get('/redo', (req, res) => {
    try {
        const redoList = fs.readFileSync(path.resolve(__dirname, 'redos', `${req.query.id}.txt`), 'utf-8')
        if (redoList) {
            res.json({redos: redoList})
        }
        res.json({redos: '[]'})
    } catch (error) {
        console.log(error);
        res.json({message: 'error getting redo list'})
    }
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    
})

