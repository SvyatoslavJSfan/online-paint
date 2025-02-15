import CanvasState from "../store/CanvasState";
import axios from "axios";



export default function init(canvas, id) {

    CanvasState.setCanvas(canvas)
    axios.get(`http://localhost:5000/image?id=${id}`)
    .then(resp => {
        const img = new Image()
        img.src = resp.data.image
            
        img.onload = () => {
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
    })

    axios.get(`http://localhost:5000/undo?id=${id}`)
    .then(resp => {
        const undoList = JSON.parse(resp.data.undos)
        CanvasState.setUndoList(undoList)
    })
    .catch(resp => console.log(resp))

    axios.get(`http://localhost:5000/redo?id=${id}`)
    .then(resp => {
        const redoList = JSON.parse(resp.data.redos)
        CanvasState.setRedoList(redoList)
    })
    .catch(resp => console.log(resp))

}