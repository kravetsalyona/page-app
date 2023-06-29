import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef} from "react";
import People from './components/People';
import Title from './components/Title';

function App() {
  
  
  // const [people,setPeople] = useState([]);

  const execOnce = useRef(false)
  const loader = () => {
    console.log('Страница загружена');
    window.webkit.messageHandlers.jsHandler.postMessage('Page loaded')
}
  useEffect(() =>{
    if (!execOnce.current) {
      window.addEventListener('load', loader)
    }
    return () => {
      execOnce.current = true;
      window.removeEventListener('load', loader)
    };
  },[])

  useEffect(() =>{
    const loaderDelay = () => { 
      console.log('Страница загружена with delay 5sec');            
      window.webkit.messageHandlers.jsHandlerDelay.postMessage('Page loaded with delay 5sec')           
    }
    const timeoutId = setTimeout(() => window.addEventListener('load', loaderDelay), 5000)
    return () => {
      clearTimeout(timeoutId)
      window.addEventListener('load', loaderDelay)
    }
  },[])      
  

  // useEffect(()=>{
  //   async function fetchPeople() {
  //     let res = await fetch('https://swapi.co/api/people/1')
  //     let data = await res.json();
  //     setPeople(data.results);
  //     }
  //     fetchPeople();
  // }, [])
  
 return (<>
    
    <Title />
    <img id="img" src={logo} className="App-logo" alt="logo" />
     <People />


 </>

 )
}

export default App;



