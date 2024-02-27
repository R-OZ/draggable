import React, {useEffect, useState} from 'react'
import { ResizableBox } from 'react-resizable'


const Resizable = ({children, width, height, type, setSize}) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const isMobile = viewportWidth <=768;

  const containerWidth = viewportWidth - 80
  const containerHeight = viewportHeight - 80

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
      <ResizableBox 
          height={height} 
          width={width}
          maxConstraints={isMobile ? [containerWidth, containerHeight] : [Infinity, Infinity]}
          resizeHandles={['s', 'n', 'e', 'w']}
          onResize={(e, {node, size, handle})=>{
            switch(type){
              case "customer":
                setSize((prev)=>({
                  width1: size.width,
                  width2: !isMobile ? prev.width3 - size.width - 30 : size.width,
                  width3: !isMobile ? prev.width3 : size.width,
                  height: size.height,
                  height3: containerHeight - size.height - 30
                }))
                break;
              case "employee":
                setSize((prev)=>({
                  width1: !isMobile ? prev.width3 - size.width - 30 : size.width,
                  width2: size.width,
                  width3: !isMobile ? prev.width3 : size.width,
                  height: size.height,
                  height3: containerHeight - size.height - 30
                }))
                break;
              case "car":
                setSize((prev)=>({
                  width1: !isMobile ? (prev.width1/(prev.width1 + prev.width2)) * (size.width-30): size.width,
                  width2: !isMobile ? (prev.width2/(prev.width1 + prev.width2)) * (size.width-30): size.width,
                  width3: size.width,
                  height: !isMobile ? containerHeight - size.height - 30 : (containerHeight - size.height - 30)/2,
                  height3: size.height
                }))
                break;
              default:
                setSize((prev)=> prev)

            }
          }}
      >
          <div style={{ padding: "8px", height:'inherit'}}>
              {children}
          </div>

      </ResizableBox>
  )
}

export default Resizable