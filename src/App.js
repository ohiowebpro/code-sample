/* React App Code by Eric Griffiths */

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
                <div><a href="https://drive.google.com/file/d/1L5eF6Ba9oQ1vmw5dAy9Y8NS4O2LYPBoQ/view?usp=sharing" target="_blank">Download Code</a></div>
                <div><a href="https://github.com/ohiowebpro/code-sample" target="_blank">This React Project on Github</a> | <a href="https://www.linkedin.com/in/ohiowebpro/" target="_blank">LinkedIn</a></div>
            </footer>
        </div>
    );
}

export default App;
