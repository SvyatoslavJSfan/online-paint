import CanvasState from "../store/CanvasState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Eraser from "../tools/Eraser";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Bucket from "../tools/Bucket";


export default function drawHandler(data) {
    const ctx = CanvasState.getCanvas().getContext('2d')
            const figure = data.figure
    
            switch (figure.type) {
                case 'finish':
                    ctx.beginPath()
                break;
                case 'brush':
                Brush.draw(ctx, figure.x, figure.y, figure.strokeColor, figure.lineWidth)   
                    break;
                case 'rect':
                Rect.draw(ctx, figure.x, figure.y, figure.width, figure.height, figure.strokeColor, figure.lineWidth, figure.fillColor)
                break
    
                case 'eraser':
                    Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth)
                    break
    
                case 'circle':
                    Circle.draw(ctx, figure.x, figure.y, figure.radius, figure.strokeColor, figure.lineWidth, figure.fillColor)
                    break
    
                case 'line':
                    Line.draw(ctx, figure.startX, figure.startY, figure.endX, figure.endY, figure.strokeColor, figure.lineWidth)
                    break

                case 'bucket':
                    Bucket.floodFill(ctx, figure.x, figure.y, figure.fillColor)
                    break
                case 'undo':
                    const img = new Image()
                    img.src = figure.dataURL
                    img.onload = () => {
                        ctx.clearRect(0, 0, CanvasState.getCanvas().width,CanvasState.getCanvas().height)
                        ctx.drawImage(img, 0, 0, CanvasState.getCanvas().width, CanvasState.getCanvas().height)
                    }
                    break
    
                default:
                    break;
            }
}