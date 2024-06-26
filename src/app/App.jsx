import './App.css';
import PageInicio from '../pages/PageInicio';
import Header from '../components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageComparar from '../pages/PageComparar';
import PageBuscar from '../pages/PageBuscar';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<PageInicio />} />
          <Route path="/buscar" element={<PageBuscar />} />
          <Route path="/comparar/:gameID" element={<PageComparar />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
