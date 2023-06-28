import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from "react";
import People from './components/People';
import Title from './components/Title';

function App() {
  
  
  const [people,setPeople] = useState([]);

  const execOnce = useRef(false)
  const loader = useEffect(() => {
    console.log('Страница загружена');
    window.webkit.messageHandlers.jsHandler.postMessage('Page loaded')
},[])
  useEffect(() =>{
    if (!execOnce.current) {
      
      window.addEventListener('load', loader)
    }
    return () => {
      execOnce.current = true;
      window.removeEventListener('load', loader)
    };
  },[loader])

  useEffect(() =>{
    const loaderDelay = () => { 
      console.log('Страница загружена with delay 5sec');            
      window.webkit.messageHandlers.jsHandlerDelay.postMessage('Page loaded with delay 5sec')           
    }
    setTimeout(() => window.addEventListener('load', loaderDelay), 5000)
    return () => window.removeEventListener('load', loaderDelay)
  },[])      
  

  useEffect(()=>{
    async function fetchPeople() {
      let res = await fetch('https://swapi.co/api/people/?format=json')
      let data = await res.json();
      setPeople(data.results);
      }
      fetchPeople();
  }, [])
  
 return (<>
    
    <Title />
    <img id="img" src={logo} className="App-logo" alt="logo" />
     <People data={people}/>


 </>

 )
}

export default App;



