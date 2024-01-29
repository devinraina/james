import { useState, useEffect } from 'react'
import { findAll, writeUserData } from '../src/services/status.mjs'
import './App.css'

function App() {
  const [count, setCount] = useState();
  console.log("count", count)
  let arr;
  const fetchData = async () => {
    let res = await findAll();
    setCount(res[0].fWash);
    console.log(res[0].bWash);
}
useEffect(() => {
  fetchData();
}, []);

async function occup(){
    let res = await findAll();
    setCount(res[0].tWash);
}
async function notOccup(){
  let res = await findAll();
  setCount(res[0].fWash);
}



return (


    <><div>
    Toilet Occupied {`${count}`}
    <button onClick={occup}>Occupied</button>
    <button onClick={notOccup}>Not Occupied</button>
  </div>
  
  </>

  )
}


export default App
