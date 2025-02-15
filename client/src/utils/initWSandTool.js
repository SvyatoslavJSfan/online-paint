import CanvasState from "../store/CanvasState";
import ToolState from "../store/ToolState";
import Brush from "../tools/Brush";
import socketEventHandler from "./socketEventHandler";

export default function initWSandTool(canvas, id) {
    const socket = new WebSocket('ws://localhost:5000')
                CanvasState.setSocket(socket)
                CanvasState.setSessionId(id)
                ToolState.setTool(new Brush(canvas, socket, id))
                socket.onopen = () => {
                    socket.send(JSON.stringify({
                    method: 'connection',
                    id: CanvasState.sessionId,
                    username: CanvasState.username
                }))
    
                
                }
                socket.onmessage = (event) => {
                    socketEventHandler(event)
                }
}