/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-useless-constructor */
// import Tool from './Tool'
import Tool from "./Tool";
import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
    }


    // draw(x, y) {
    //     this.ctx.strokeStyle = "white"
    //     this.ctx.lineTo(x, y)
    //     this.ctx.stroke()
    // }

    mouseMoveHandler (e) {
        if (this.isMouseDown) {
                this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'eraser',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    lineWidth: this.ctx.lineWidth
                }
            }))
        }
    }

    static draw(ctx, x, y, lineWidth) {
        ctx.strokeStyle = 'white'
        ctx.lineWidth = lineWidth
        ctx.lineTo(x, y)
        ctx.stroke()
        
    }
}

