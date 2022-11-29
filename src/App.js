import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  
  const [country, setCountry] = useState('in');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [progress, setProgressV] = useState(0);
  
  const setProgress = (progress)=>{
    setProgressV(progress)
  }

  const apiKey = process.env.REACT_APP_NEWS_API

  const toggleCountry= (event)=>{
    setCountry(event.target.attributes.value.nodeValue);
    setSelectedCountry(countryStruct[event.target.attributes.value.nodeValue]);
  }  
  
  
  let categoryList = ['all','business','entertainment','health','science','sports','technology'];
  let countryStruct = {
    in : 'India', us : 'U.S', cn : 'China', gb: 'Great Britain', fr: 'France'
  };
    
  return (
      <>
        <Router>
          <NavBar categoryList={categoryList} countryStruct={countryStruct} toggleCountry={toggleCountry} selectedCountry={selectedCountry}/>
          <LoadingBar
            color='#f11946'
            height = {3}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Switch>
            <Route path="/business"><News setProgress={setProgress} apiKey={apiKey} key="business" country={country} category="business"/></Route>
            <Route path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key="entertainment" country={country} category="entertainment"/></Route>
            <Route path="/health"><News setProgress={setProgress} apiKey={apiKey} key="health" country={country}category="health"/></Route>
            <Route path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" country={country} category="science"/></Route>
            <Route path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" country={country} category="sports"/></Route>
            <Route path="/technology"><News setProgress={setProgress} apiKey={apiKey} key="technology" country={country} category="technology"/></Route>
            <Route path="/"><News setProgress={setProgress} apiKey={apiKey} key="general" country={country} category="general"/></Route>
          </Switch>
          
          
          </Router>
      </>
    )
  }


  export default App;

