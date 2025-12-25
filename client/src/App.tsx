
import CreateWorkflow from './components/CreateWorkflow';
import {Router, BrowserRouter, Routes, Route} from 'react-router-dom';




export default function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<CreateWorkflow />} />
      </Routes>
    </BrowserRouter>
  </div>
  
}
