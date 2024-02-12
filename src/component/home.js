import React from 'react';
import Header from './Header';
import Clickr from "../img/logo.webp"

const App = () => {
  
   return (
      <div className="App">
         <Header/>

         <div style={{marginTop:150}}>
            <img src={Clickr} style={{width:500,height:150}}/>
         </div>
         
      </div>
   );
};
export default App;