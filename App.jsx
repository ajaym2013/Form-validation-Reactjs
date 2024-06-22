import React, { useState } from 'react'; 
import './App.css';
import ApplicationForm from './ApplicationForm';

function App() {
  const [count, setCount] = useState(0); 

  return (
    <div className="App">
      <ApplicationForm />
    </div>
  );
}

export default App;
