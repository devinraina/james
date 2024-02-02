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
  }, []);

  const occup = async () => {
    await updateT();
    setCount(res[0]?.tWash);
    setTimeout(() => {
      console.log('Hello Timeout! fetchdata')
      fetchData();
   }, 1000);
   setTimeout(() => {
    console.log('Hello Timeout! notOccup')
    notOccup();
 }, 30000);
  };

  const notOccup = async () => {
    await updateF();
    setCount(res[0]?.tWash);
    setTimeout(() => {
      console.log('Hello Timeout! fetchdata')
      fetchData();
   }, 1000);
  };

 if(count === 'false')
 {
  document.body.style.color = 'green';
 }
 else if(count === 'true'){
  document.body.style.color = 'red';
 }

  console.log("count", count);

  return (
    <><div>
      <div className='divt'>
        Toilet Occupied {`${count}`}<br></br><br />
        </div>
        <button onClick={occup}>Occupied</button>
        <button onClick={notOccup}>Not Occupied</button>
        <button onClick={fetchData}>Refresh Status</button>
      </div>
    </>
  );
}

export default App;
