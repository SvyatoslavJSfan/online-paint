import drawHandler from "./drawHandler";
import CanvasState from "../store/CanvasState";

export default function socketEventHandler(event) {
                    const data = JSON.parse(event.data)
                switch (data.method) {
                    case 'connection':
                        console.log(`User  joined.`);
                        break;
                    case 'draw':
                    drawHandler(data)
                        break;
                    case 'finish':
                        drawHandler(data)
                        break;
                    case 'undo':
                        drawHandler(data)
                        break;
                    case 'updateUndoList':
                        CanvasState.setUndoList(data.undos)
                        break;
                    case 'updateRedoList':
                        CanvasState.setRedoList(data.redos)
                        break
                    default:
                        break;
                } 
}




 