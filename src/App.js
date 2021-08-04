import React , {useState} from 'react'
import './App.css';
import PopUp from './components/PopUp';

function App() {
  const [click, setClick] = useState(false)
  const toggle = (a) => {
    setClick(a)
  }
  return (
    <div className="App">
      {click ?
     <PopUp toggle={toggle}/>
     :
     <button onClick={() => toggle(true)} className="primary_button">Click ME</button>
      }
    </div>
  );
}

export default App;
