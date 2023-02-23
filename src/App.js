import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './App.css';
import CarouselComponent from "./components/carousel.component";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Code/Design Samples</h1>
      </header>
      <CarouselComponent />
      <footer>
          <div><a href="./code-samples.zip" target="_blank">Download Code</a></div>
          <div><a href="https://github.com/ohiowebpro/code-sample" target="_blank">This React Project on Github</a> | <a href="https://www.linkedin.com/in/ohiowebpro/" target="_blank">LinkedIn</a></div>
      </footer>

    </div>
  );
}

export default App;
