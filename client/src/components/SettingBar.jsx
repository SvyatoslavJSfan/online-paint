import ToolState from '../store/ToolState';
import '../styles/toolbar.scss'

const SettingBar = () => {
    return ( 
        <>
        <div className="settingbar">
            <label htmlFor="stroke-color">Цвет обводки</label>
            <input onChange={(e) => ToolState.setStrokeColor(e.target.value)} style={{marginLeft: '10px'}} type="color" id='stroke-color'/>

            <label htmlFor="line-width" style={{marginLeft: '10px'}}>Толщина линии</label>
            <input 
            onChange={(e) => ToolState.setLineWidth(e.target.value)} 
            style={{marginLeft: '10px'}} 
            type='number'
            defaultValue={1}
            min={1}
            max={50}
            id='line-width'/>
        </div>
        </>
     );
}
 
export default SettingBar;