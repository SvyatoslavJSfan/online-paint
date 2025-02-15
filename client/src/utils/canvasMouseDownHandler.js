import CanvasState from "../store/CanvasState";

export default async function canvasMouseDownHandler() {
            const data = CanvasState.getCanvas().toDataURL()
            CanvasState.addToUndoList(data)
    
            if(CanvasState.socket){
                CanvasState.socket.send(JSON.stringify({
                    method: 'updateUndoList',
                    id: CanvasState.id,
                    undos: CanvasState.getUndoList()
                }))
            }
}