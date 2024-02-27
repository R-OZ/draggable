import React, {useState, useEffect, useLayoutEffect} from 'react'
import './index.css';
import Resizable from './components/resizable';
import Customers from './components/customers';
import Employees from './components/employees';
import Cars from './components/cars';


function App() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const containerWidth = viewportWidth - 80
  const containerHeight = viewportHeight - 80

  const [size, setSize] = useState(() => {
    const initialWidth1 = viewportWidth> 768 ? 0.5 * (containerWidth - 30) : containerWidth;
    const initialWidth2 = viewportWidth> 768 ? containerWidth - initialWidth1 - 30 : containerWidth;
    const initialHeight = viewportWidth> 768 ? 0.5 * (containerHeight - 30) : 300;
    const initialHeight3 = viewportWidth> 768 ? containerHeight - initialHeight - 30 : 300;
    return {
      width1: initialWidth1,
      width2: initialWidth2,
      width3: containerWidth,
      height: initialHeight,
      height3: initialHeight3
    };
  });


  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  



  return (
    <div className="app" style={{height: viewportHeight}}>
      <div className='container'>
        <Resizable width={size.width1} height={size.height} type={"customer"} setSize={setSize}>
          <Customers />
        </Resizable>

        <Resizable width={size.width2} height={size.height} type={"employee"} setSize={setSize}>
          <Employees />
        </Resizable>
      </div>

      <div className='container'>
        <Resizable width={size.width3} height={size.height3} type={"car"} setSize={setSize}>
          <Cars />
        </Resizable>      
      </div>

    </div>
  );
}

export default App;
