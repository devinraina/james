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
    setIsLoading(false);
    setRes(response);
    setCount(response[0]?.tWash); 
    // Optional chaining to handle potential undefined values
  };

  useEffect(() => {
    fetchData();
  }, []);

  setInterval(fetchData(),5000);

  const occupied = async () => {
    setIsLoading(true);
    await updateT();
    setCount(res[0]?.tWash);
    setTimeout(() => {
      console.log('Hello Timeout! fetchdata')
        fetchData();
   }, 1000);
   watchGlob();
  };

  function watchGlob(){
    var temp_glob=count;
    setTimeout(function(){
      if(temp_glob == count){
        console.log("temp == count")
        notOccupied();
      }
      else{
        notOccupied();
      }
    },60000)
  }

  const notOccupied = async () => {
    setIsLoading(true);
    await updateF();
    setCount(res[0]?.tWash);
    console.log("notO summoned")
    setTimeout(() => {
      console.log('Hello Timeout! fetchdata')
      fetchData();
   }, 1000);
  };

  const refresh= async ()=>{
    setIsLoading(true);
    setTimeout( await fetchData(),10000)
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
         {count==='false'? <button onClick={occupied}>Occupy</button>:<div></div>}&nbsp; 
        <button onClick={refresh}>Refresh Status</button>
      </div>
  );
 


  return (
    <>
      {count==='false'? <h3>Refresh Once Before Occupying.</h3>:<div></div>}&nbsp; 
      {isLoading ? <LoadingSpinner /> : donothing}<br />
    </>
  );
}

export default App;
