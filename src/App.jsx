import { useState, useEffect } from 'react';
import { findAll, updateT, updateF } from '../src/services/status.mjs';
import './App.css';
import LoadingSpinner from './services/LoadingSpinner';

function App() {
  const [count, setCount] = useState(0);
  const [res, setRes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchData = async () => {
    const response = await findAll();
    setRes(response);
    setCount(response[0]?.tWash); 
    setTimeout(setIsLoading(false),3000)// Optional chaining to handle potential undefined values
  };

  useEffect(() => {
    fetchData();
  }, []);

  const occup = async () => {
    setIsLoading(true);
    await updateT();
    setCount(res[0]?.tWash);
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
    setIsLoading(true);
    await updateF();
    setCount(res[0]?.tWash);
    setTimeout(() => {
      console.log('Hello Timeout! fetchdata')
      fetchData();
   }, 1000);
  };

  const refresh= async ()=>{
    setIsLoading(true);
    setTimeout( await fetchData(),1000)
  }

 if(count === 'false')
 {
  document.body.style.color = 'green';
 }
 else if(count === 'true'){
  document.body.style.color = 'red';
 }

  console.log("count", count);

  const donothing=(
    <div>
      <div className='divt'>
        Toilet Occupied {`${count}`}<br></br><br />
        </div>
        
        <button onClick={occup}>Occupied</button> &nbsp; 
        <button onClick={notOccup}>Not Occupied</button> &nbsp; 
        <button onClick={refresh}>Refresh Status</button>
      </div>
  );


  return (
    <>
      {isLoading ? <LoadingSpinner /> : donothing}<br />
    </>
  );
}

export default App;
