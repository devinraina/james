import { useState, useEffect } from 'react';
import { findAll, updateT, updateF } from '../src/services/status.mjs';
import './App.css';
import { LoadingSpinner } from './services/LoadingSpinner.jsx'

function App() {
  const [count, setCount] = useState(0);
  const [res, setRes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const response = await findAll();
    setRes(response);
    setCount(response[0]?.tWash); 
    setIsLoading(false);// Optional chaining to handle potential undefined values
  };

  useEffect(() => {
    fetchData();
  }, []);

  const occup = async () => {
    await updateT();
    setCount(res[0]?.tWash);
    setIsLoading(true);
    setTimeout(() => {
      console.log('Hello Timeout! fetchdata')
      fetchData();
   }, 1000);
   setTimeout(() => {
    console.log('Hello Timeout! notOccup')
    notOccup();
 }, 60000);
  };

  const notOccup = async () => {
    await updateF();
    setCount(res[0]?.tWash);
    setIsLoading(true);
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
        {isLoading ? <LoadingSpinner /> : alert("status refreshed.")}
        <button onClick={occup}>Occupied</button>
        <button onClick={notOccup}>Not Occupied</button>
        <button onClick={fetchData}>Refresh Status</button>
      </div>
    </>
  );
}

export default App;
