import logo from './logo.svg';
import './App.css';
import { useLayoutEffect, useEffect, useState, useRef} from "react";
import People from './components/People';
import Title from './components/Title';

// if (!window.webkit) {
//   const webkit = {
//     messageHandlers: {
//       jsHandler: {
//         postMessage: (message) => console.log('message: ', message),
//       },
//       jsHandlerDelay: {
//         postMessage: (message) => console.log('messageDelay: ', message),
//       }
//     }
//   }
//   window.webkit = webkit; 
// }

function App() {
  const [webkitLoaded, setWebkitLoaded] = useState(false)
  const pageLoadedRef = useRef(false)

  const loader = () => {
    console.log('Страница загружена');
    pageLoadedRef.current = true;
  }

  useEffect(() => {
    if (webkitLoaded && pageLoadedRef.current) {
      window.webkit.messageHandlers.jsHandler.postMessage('Page loaded');
    }
  }, [webkitLoaded, pageLoadedRef])

  useLayoutEffect(() =>{
    window.addEventListener('load', loader)

    const intervalId = setInterval(() => {
      if (window.webkit) {
        setWebkitLoaded(true)
      }
    }, 500);
    
    return () => {
      clearInterval(intervalId)
      window.removeEventListener('load', loader)
    };
  },[]) 

  // useEffect(()=>{
  //   async function fetchPeople() {
  //     let res = await fetch('https://swapi.co/api/people/1')
  //     let data = await res.json();
  //     setPeople(data.results);
  //     }
  //     fetchPeople();
  // }, [])
  
 return (<>{
    window.webkit?.messageHandlers?.jsHandlerDelay?.postMessage ?
      <>
        <Title />
        <img id="img" src={logo} className="App-logo" alt="logo" />
        <People />
      </>
     : <div>window.webkit?.messageHandlers?.jsHandlerDelay?.postMessage - не определён</div>
    }</>)
}

export default App;



