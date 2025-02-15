import { useEffect, useState } from 'react';
import CanvasState from '../store/CanvasState';
import '../styles/footer.scss'
import { observer } from 'mobx-react-lite';

const Footer = observer(() => {

    
    return ( 
        <>
        <div className="footer">
            {CanvasState.getUsername()}
        </div>
        </>
     );
})
 
export default Footer;