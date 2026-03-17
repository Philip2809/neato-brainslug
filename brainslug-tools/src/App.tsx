import './App.css'
import Header from './components/header'
import { Navigate, Route, Routes } from "react-router-dom";
import Robot from './pages/robot';
import Flasher from './pages/flasher';
import Unsupported from './pages/unsupported';
import Home from './pages/home';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/robot" element={<Robot />} />
        <Route path="/flash" element={<Flasher />} />
        <Route path="/unsupported" element={<Unsupported />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
