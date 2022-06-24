import Table from './components/table';
import {Routes, Route} from 'react-router-dom';
import PageItem from './components/pageItem';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Table/>} /> 
        <Route path=":id" element={ <PageItem/>} />  
      </Routes>
    </div>
  );
}

export default App;
