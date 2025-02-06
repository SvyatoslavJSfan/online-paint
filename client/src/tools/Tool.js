/* eslint-disable import/no-anonymous-default-export */
export default class Tool {

    

    constructor(canvas, socket, id) {
        this.canvas = canvas
        this.socket = socket
        this.id = id
        this.ctx = canvas.getContext('2d')
        // this.ctx.strokeStyle = 'black'
    }

    destroyListeners() {
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
        this.canvas.onmousemove = null
        this.ctx.strokeStyle = 'black'
    }
}


