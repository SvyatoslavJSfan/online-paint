/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-useless-constructor */
import Tool from './Tool'

export default class Bucket extends Tool {

    constructor(canvas, socket, id) {
        super(canvas, socket, id)
        this.listen()
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        // this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseDownHandler (event) {
        // this.ctx.closePath()
        this.isMouseDown = true
        const rect = event.target.getBoundingClientRect();
        const x = Math.floor(event.clientX - rect.left);
        const y = Math.floor(event.clientY - rect.top);
        const fillColor = this.hexToRGBA(this.ctx.fillStyle)
    
        this.floodFill(this.ctx, x, y, fillColor)

        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'bucket',
                x: x,
                y: y,
                fillColor: fillColor
            }
        }))
 
    }

    mouseUpHandler (event) {
        // this.isMouseDown = false
        // const canvas = event.target;
        // const ctx = canvas.getContext("2d");
    
        const rect = event.target.getBoundingClientRect();
        const x = Math.floor(event.clientX - rect.left);
        const y = Math.floor(event.clientY - rect.top);
        const fillColor = this.hexToRGBA(this.ctx.fillStyle)
    
        this.floodFill(this.ctx, x, y, fillColor)
        
        this.socket.send(JSON.stringify({
            method: 'finish',
            id: this.id,
            figure: {
                type: 'finish'
            }
        }))

        
    }

    floodFill (ctx, x, y, fillColor) {
        const canvas = ctx.canvas;
        const width = canvas.width;
        const height = canvas.height;
        
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;
    
        const startPos = (y * width + x) * 4;
        const startColor = pixels.slice(startPos, startPos + 4);
        
        if (
            startColor[0] === fillColor[0] &&
            startColor[1] === fillColor[1] &&
            startColor[2] === fillColor[2] &&
            startColor[3] === fillColor[3]
        ) return;
    
        const stack = [[x, y]];
    
        while (stack.length > 0) {
            const [px, py] = stack.pop();
            const index = (py * width + px) * 4;
    
            if (px < 0 || py < 0 || px >= width || py >= height) continue;
    
            if (
                pixels[index] !== startColor[0] ||
                pixels[index + 1] !== startColor[1] ||
                pixels[index + 2] !== startColor[2] ||
                pixels[index + 3] !== startColor[3]
            ) continue

            pixels[index] = fillColor[0];
            pixels[index + 1] = fillColor[1]
            pixels[index + 2] = fillColor[2]
            pixels[index + 3] = fillColor[3]
    
            stack.push([px + 1, py])
            stack.push([px - 1, py])
            stack.push([px, py + 1])
            stack.push([px, py - 1])
        }
    
        ctx.putImageData(imageData, 0, 0);
    }

    hexToRGBA(hex) {
        hex = hex.replace(/^#/, "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b, 255];
    }

    static floodFill (ctx, x, y, fillColor) {
        const canvas = ctx.canvas;
        const width = canvas.width;
        const height = canvas.height;
        
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;
    
        const startPos = (y * width + x) * 4;
        const startColor = pixels.slice(startPos, startPos + 4);
        
        if (
            startColor[0] === fillColor[0] &&
            startColor[1] === fillColor[1] &&
            startColor[2] === fillColor[2] &&
            startColor[3] === fillColor[3]
        ) return;
    
        const stack = [[x, y]];
    
        while (stack.length > 0) {
            const [px, py] = stack.pop();
            const index = (py * width + px) * 4;
    
            if (px < 0 || py < 0 || px >= width || py >= height) continue;
    
            if (
                pixels[index] !== startColor[0] ||
                pixels[index + 1] !== startColor[1] ||
                pixels[index + 2] !== startColor[2] ||
                pixels[index + 3] !== startColor[3]
            ) continue

            pixels[index] = fillColor[0];
            pixels[index + 1] = fillColor[1]
            pixels[index + 2] = fillColor[2]
            pixels[index + 3] = fillColor[3]
    
            stack.push([px + 1, py])
            stack.push([px - 1, py])
            stack.push([px, py + 1])
            stack.push([px, py - 1])
        }
    
        ctx.putImageData(imageData, 0, 0);
    }
    
}

