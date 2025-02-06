/* eslint-disable import/no-anonymous-default-export */
import { makeAutoObservable } from "mobx";

class CanvasState {

    canvas = null
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

    setUsername(name) {
        this.username = name
    }

    setSocket(socket) {
        this.socket = socket
    }

    setSessionId(id) {
        this.sessionId = id
    }

    addToUndoList(value) {
        this.undoList.push(value)
    }

    addToRedoList(value) {
        this.redoList.push(value)
    }

    undo() {
        let ctx = this.canvas.getContext('2d')
        if (this.undoList.length > 0) {
        const dataUrl = this.undoList.pop()
        this.redoList.push(this.canvas.toDataURL())
        const img = new Image()
        img.src = dataUrl
        // this.ctx = this.canvas.getContext('2d')
        img.onload = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }

    }

    redo() {
        let ctx = this.canvas.getContext('2d')
        if (this.redoList.length > 0) {
        const dataUrl = this.redoList.pop()
        this.undoList.push(this.canvas.toDataURL())
        const img = new Image()
        img.src = dataUrl
        // this.ctx = this.canvas.getContext('2d')
        img.onload = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        }
        } else {
            console.log('...');
       
        }
    }

    
}


export default new CanvasState()