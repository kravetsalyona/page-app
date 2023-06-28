import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import People from './components/People';
import Title from './components/Title';

function App() {
  
  
  const [people,setPeople] = useState([]);
useEffect(() =>{
  const img = document.getElementById('img');
  
        const loader = () => {

          console.log('Страница загружена');
          console.log(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
          window.webkit.messageHandlers.jsHandler.postMessage('Page loaded')
        }
        window.addEventListener('load', loader)
        return () => window.removeEventListener('load', loader)
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



