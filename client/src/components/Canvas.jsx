import { useEffect, useRef, useState } from 'react';
import '../styles/canvas.scss'
import { observer } from 'mobx-react-lite';
import CanvasState from '../store/CanvasState';
import ToolState from '../store/ToolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Eraser from '../tools/Eraser';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Canvas = observer(() => {

    const canvasRef = useRef()
    const inputRef = useRef()
    const [showModal, setShowModal] = useState(true)
    const params = useParams()

    useEffect(() => {
        CanvasState.setCanvas(canvasRef.current)
        axios.get(`http://localhost:5000/image?id=${params.id}`)
        .then(resp => {
            const img = new Image()
            img.src = resp.data.image
                // console.log(resp.data);
            img.onload = () => {
                const ctx = canvasRef.current.getContext('2d')
                ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
            }
        })
    }, [])

    useEffect(() => {

        if(CanvasState.username) {
            const socket = new WebSocket('ws://localhost:5000')
            CanvasState.setSocket(socket)
            CanvasState.setSessionId(params)
            ToolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                socket.send(JSON.stringify({
                method: 'connection',
                id: CanvasState.sessionId,
                username: CanvasState.username
            }))

            
            }
            socket.onmessage = (event) => {
                
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
                    default:
                        break;
                }  
            }
        }

    }, [CanvasState.username])

    function mouseDownHandler() {
        const data = canvasRef.current.toDataURL()
        CanvasState.addToUndoList(data)
    }

    function mouseUpHandler() {
        
        axios.post(`http://localhost:5000/image?id=${params.id}`, {
            img: canvasRef.current.toDataURL()
        })
    }

    function enterHandler() {
        CanvasState.setUsername(inputRef.current.value)
        setShowModal(false)
    }

    function drawHandler(data) {
        const ctx = canvasRef.current.getContext('2d')
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

            default:
                break;
        }
        
    }


    return ( 
        <div className="canvas">
            <canvas 
            ref={canvasRef} width={600} height={400}
            onMouseDown={mouseDownHandler}
            onMouseUp={() => mouseUpHandler()}
            >

            </canvas>

    <Modal show={showModal} >
        <Modal.Header closeButton>
          <Modal.Title>Кто ты?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type="text" ref={inputRef}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={enterHandler}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
     );
})
 
export default Canvas;