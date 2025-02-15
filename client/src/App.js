import SettingBar from "./components/SettingBar";
import ToolBar from "./components/ToolBar";
import Canvas from "./components/Canvas";
import Footer from './components/Footer'
import './styles/app.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CanvasState from "./store/CanvasState";

function App() {
  
  return (
    <>
    <BrowserRouter>
          <div className="app">
            <Routes>
            <Route
            path="/:id"
            element={
              <>
                <ToolBar />
                <SettingBar />
                <Canvas />
                <Footer/>
              </>
            }
          />

              <Route path={`*`} element={<Navigate to={`f${(+new Date()).toString(16)}`} replace />}/>
            </Routes>

      </div>
    </BrowserRouter>
    
    </>
  );
}

export default App;
