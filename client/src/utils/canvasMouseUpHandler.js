import CanvasState from "../store/CanvasState";
import axios from "axios";

export default async function canvasMouseUpHandler() {
    await axios.post(`http://localhost:5000/image?id=${CanvasState.getSessionId()}`, {
        img: CanvasState.getCanvas().toDataURL()
    })
    await axios.post(`http://localhost:5000/undo?id=${CanvasState.getSessionId()}`, {
        undos: JSON.stringify(CanvasState.getUndoList())
    })

    await axios.post(`http://localhost:5000/redo?id=${CanvasState.getSessionId()}`, {
        redos: JSON.stringify(CanvasState.getRedoList())
    })
}