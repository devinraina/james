import { useState, useEffect } from 'react';
import { findAll, updateT, updateF } from '../src/services/status.mjs';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [res, setRes] = useState([]);

  const fetchData = async () => {
    const response = await findAll();
    setRes(response);
    setCount(response[0]?.tWash); // Optional chaining to handle potential undefined values
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  const occup = async () => {
    await updateT();
    setCount(res[0]?.tWash);
  };

  const notOccup = async () => {
    await updateF();
    setCount(res[0]?.tWash);
  };

  console.log("count", count);

  return (
    <>
      <div>
        Toilet Occupied {`${count}`}
        <button onClick={occup}>Occupied</button>
        <button onClick={notOccup}>Not Occupied</button>
      </div>
    </>
  );
}

export default App;
