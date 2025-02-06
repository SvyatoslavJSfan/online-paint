/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-useless-constructor */
import Tool from './Tool'

export default class Rect extends Tool {

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
        this.isMouseDown = true
        this.ctx.beginPath()
        this.x = e.pageX - e.target.offsetLeft
        this.y = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }

    mouseUpHandler () {
        this.isMouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'rect',
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                strokeColor: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth,
                fillColor: this.ctx.fillStyle
            }
        }))

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
            this.width = (e.pageX - e.target.offsetLeft) - this.x
            this.height = (e.pageY - e.target.offsetTop) - this.y
            this.draw(this.x, this.y, this.width, this.height)
        }
    }

    draw(x, y, w, h) {
        
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, h)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    static draw(ctx, x, y, w, h, strColor, lWidth, fColor) {
        ctx.strokeStyle = strColor
        ctx.lineWidth = lWidth
        ctx.fillStyle = fColor
        ctx.rect(x, y, w, h)
        ctx.fill()
        ctx.stroke()
    }
}

