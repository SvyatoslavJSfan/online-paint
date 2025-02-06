/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-useless-constructor */
import Tool from './Tool'
import axios from 'axios'

export default class Brush extends Tool {

    constructor(canvas, socket, id) {
        super(canvas, socket, id)
        this.listen()
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseDownHandler (e) {
        // this.ctx.closePath()
        this.isMouseDown = true
        this.ctx.beginPath()
        this.x = e.pageX - e.target.offsetLeft
        this.y = e.pageY - e.target.offsetTop
        this.ctx.moveTo(this.x, this.y)
    }

    mouseUpHandler () {
        this.isMouseDown = false
        this.socket.send(JSON.stringify({
            method: 'finish',
            id: this.id,
            figure: {
                type: 'finish'
            }
        }))

        
    }

    mouseMoveHandler (e) {
        if (this.isMouseDown) {
                this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    strokeColor: this.ctx.strokeStyle,
                    lineWidth: this.ctx.lineWidth
                }
            }))
        }
    }

    static draw(ctx, x, y, color, lineWidth) {
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.lineTo(x, y)
        ctx.stroke()
        
    }
}

