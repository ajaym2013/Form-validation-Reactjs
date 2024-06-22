import React, { useState } from 'react'; // Import useState from react
import './App.css';
import ApplicationForm from './ApplicationForm';

function App() {
  const [count, setCount] = useState(0); // Initialize count state with useState

  return (
    <div className="App">
      <ApplicationForm />
    </div>
  );
}

export default App;
