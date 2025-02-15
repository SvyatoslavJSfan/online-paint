/* eslint-disable import/no-anonymous-default-export */
import { makeAutoObservable } from "mobx";
import axios from 'axios'

class CanvasState {

    canvas = null
    width = 1000
    height = 600
    scale = 1
    username = null
    socket = null
    sessionId = null
    undoList = []
    redoList = []

    constructor () {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    getCanvas() {
        return this.canvas
    }

    getCanvasSize() {
        return {
            width: this.width,
            height: this.height
        }
    }

    setCanvasSize(w, h) {
        this.width = w
        this.height = h
    }

    getScale() {
        return this.scale
    }

    setScale(value) {
        this.scale = value
    }

    setUsername(name) {
        this.username = name
    }

    getUsername() {
        return this.username
    }

    setSocket(socket) {
        this.socket = socket
    }

    setSessionId(id) {
        this.sessionId = id
    }

    getSessionId() {
        return this.sessionId
    }

    addToUndoList(value) {
        this.undoList.push(value)
    }

    setUndoList(arr) {
        this.undoList = arr
    }

    getUndoList() {
        return this.undoList
    }

    getRedoList() {
        return this.redoList
    }

    addToRedoList(value) {
        this.redoList.push(value)
    }

    setRedoList(arr) {
        this.redoList = arr
    }

    async undo() {

        if (this.undoList.length > 0) {
        const dataUrl = this.undoList.pop()
        
        this.redoList.push(this.canvas.toDataURL())
        
        await axios.post(`http://localhost:5000/image?id=${this.sessionId}`, {
            img: dataUrl,
        })

        await axios.post(`http://localhost:5000/undo?id=${this.sessionId}`, {
            undos: JSON.stringify(this.undoList)
        })

        await axios.post(`http://localhost:5000/redo?id=${this.sessionId}`, {
            redos: JSON.stringify(this.redoList)
        })

        this?.socket?.send(JSON.stringify({
            method: 'updateUndoList',
            id: this.id,
            undos: this.undoList
        }))

        this?.socket?.send(JSON.stringify({
            method: 'updateRedoList',
            id: this.id,
            redos: this.redoList
        }))

        this?.socket?.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'undo',
                dataURL: dataUrl
            }
        }))



        } else {
            console.log('...');
        }

    }

    async redo() {
  
        if (this.redoList.length > 0) {
        const dataUrl = this.redoList.pop()
        this.undoList.push(this.canvas.toDataURL())
        await axios.post(`http://localhost:5000/image?id=${this.sessionId}`, {
            img: dataUrl,
        })

        await axios.post(`http://localhost:5000/undo?id=${this.sessionId}`, {
            undos: JSON.stringify(this.undoList)
        })

        await axios.post(`http://localhost:5000/redo?id=${this.sessionId}`, {
            redos: JSON.stringify(this.redoList)
        })

        this?.socket?.send(JSON.stringify({
            method: 'updateUndoList',
            id: this.id,
            undos: this.undoList
        }))

        this?.socket?.send(JSON.stringify({
            method: 'updateRedoList',
            id: this.id,
            redos: this.redoList
        }))

        this?.socket?.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'undo',
                dataURL: dataUrl
            }
        }))
        } else {
            console.log('...');
       
        }
    }

    
}


export default new CanvasState()