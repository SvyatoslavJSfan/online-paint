import '../styles/toolbar.scss';
import CanvasState from '../store/CanvasState';
import ToolState from '../store/ToolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';
import { useParams } from 'react-router-dom';

const ToolBar = () => {

    const param = useParams()

    function download() {
        const picture = CanvasState.canvas.toDataURL()
        const aElement = document.createElement('a')
        aElement.href = picture
        aElement.download = param.id + '.jpg'
        document.body.appendChild(aElement)
        aElement.click()
        document.body.removeChild(aElement)
    }

    return ( 
        <>
        <div className="toolbar">
            <button className='toolbar__btn brush' onClick={() => ToolState.setTool(new Brush(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))}></button>
            <button className='toolbar__btn rect' onClick={() => ToolState.setTool(new Rect(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))}></button>
            <button className='toolbar__btn circle' onClick={() => ToolState.setTool(new Circle(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))}></button>
            <button className='toolbar__btn eraser'onClick={() => ToolState.setTool(new Eraser(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))}></button>
            <button className='toolbar__btn line' onClick={() => ToolState.setTool(new Line(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))}></button>
            <input type='color'
            onChange={(e) => ToolState.setFillColor(e.target.value)}
            ></input>
            <button className='toolbar__btn undo' onClick={() => CanvasState.undo()}></button>
            <button className='toolbar__btn redo' onClick={() => CanvasState.redo()}></button>
            <button className='toolbar__btn save' onClick={() => download()}></button>
        </div>
        </>
     );
}
 
export default ToolBar;