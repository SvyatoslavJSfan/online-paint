import { useEffect, useRef, useState } from 'react';
import '../styles/canvas.scss'
import { observer } from 'mobx-react-lite';
import CanvasState from '../store/CanvasState';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import init from '../utils/init';
import initWSandTool from '../utils/initWSandTool';
import canvasMouseDownHandler from '../utils/canvasMouseDownHandler';
import canvasMouseUpHandler from '../utils/canvasMouseUpHandler';

const Canvas = observer(() => {

    const canvasRef = useRef()
    const inputRef = useRef()
    const [showModal, setShowModal] = useState(true)
    const params = useParams()
    const [canvasSize, setCanvasSize] = useState(CanvasState.getCanvasSize())

    useEffect(() => {
        init(canvasRef.current, params.id)
    }, [])

    useEffect(() => {

        if(CanvasState.username) {
            initWSandTool(canvasRef.current, params.id)
        }

    }, [CanvasState.username])


    function enterHandler() {
        CanvasState.setUsername(inputRef.current.value)
        setShowModal(false)
    }


    return ( 
        <div className="canvas" >
            <canvas 
            ref={canvasRef} width={1200} height={800}
            onMouseDown={canvasMouseDownHandler}
            onMouseUp={canvasMouseUpHandler}
            >
            </canvas>

    <Modal show={showModal} >
        <Modal.Header closeButton>
          <Modal.Title>Введите ваше имя</Modal.Title>
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