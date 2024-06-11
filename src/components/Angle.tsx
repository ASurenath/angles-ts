import React, { useEffect, useRef, useState } from "react";

function Angle() {
  const svgBox = useRef<SVGSVGElement>(null);
  const outerBox = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState<number>(1);
  const [boxHeight, setBoxHeight] = useState<number>(1);
  const [unit, setUnit] = useState<number>(1);
  const [angle, setAngle] = useState<number>(135);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [angleType, setAngleType] = useState<string>("Acute");

  useEffect(() => {
    setX(Math.cos((angle * Math.PI) / 180));
    setY(Math.sin((angle * Math.PI) / 180));
    if (angle == 0) {
      setAngleType("Zero");
    }
    else if (angle < 90) {
      setAngleType("Acute");
    }  
     else if (angle == 90) {
      setAngleType("Right");
    } else if (angle > 90 && angle < 180) {
      setAngleType("Obtuse");
    } else if (angle == 180) {
      setAngleType("Straight");
    } else if (angle > 180 && angle < 360) {
      setAngleType("Reflex");
    } else if (angle == 360) {
      setAngleType("Full");
    }
  }, [angle]);

  // useEffect(() => {
  //   const updateBoxDimensions = () => {
  //     // Update box width and height
  //     if(outerBox.current){setBoxWidth(outerBox.current.getBoundingClientRect().width);
  //     setBoxHeight(outerBox.current.getBoundingClientRect().height);
  //     setUnit(
  //       Math.min(
  //         outerBox.current.getBoundingClientRect().width / 100,
  //         outerBox.current.getBoundingClientRect().height / 100
  //       )
  //     );}
  //   };
  //   updateBoxDimensions();
  //   window.addEventListener("resize", updateBoxDimensions);
  //   return () => {
  //     window.removeEventListener("resize", updateBoxDimensions);
  //   };
  // }, [outerBox]);
  const handleDrag = (e:any) => {
    // e.preventDefault()
    if (dragging && svgBox.current) {
      let cursorX: number=0
      let cursorY: number=0
      let dy: number=0
      const svgRect = svgBox.current.getBoundingClientRect();
      if (e.type === "mousemove") {
        e.preventDefault();
        cursorX = (e.clientX - svgRect.left)*100/svgRect.width;
        cursorY = (e.clientY - svgRect.top)*100/svgRect.height;
        dy = Math.sign(e.movementY);
      } else if (e.type === "touchmove") {
        cursorX = (e.changedTouches[0].clientX - svgRect.left)*100/svgRect.width;
        cursorY = (e.changedTouches[0].clientY - svgRect.top)*100/svgRect.height;
        dy = Math.sign(e.changedTouches[0].movementY);
      }
      if (50  - cursorY == 0) {
        if (cursorX - 50  > 0) {
          if (dy > 0) {
            setAngle(0);
          } else {
            setAngle(360);
          }
        } else {
          setAngle(180);
        }
      } else if (50  - cursorY < 0) {
        if (
          (180 * Math.atan((50  - cursorY) / (cursorX - 50 ))) /
            Math.PI <
          0
        ) {
          setAngle(
            360 +
              Math.floor(
                (180 *
                  Math.atan((50  - cursorY) / (cursorX - 50 ))) /
                  Math.PI
              )
          );
        } else {
          setAngle(
            180 +
              Math.abs(
                Math.floor(
                  (180 *
                    Math.atan((50  - cursorY) / (cursorX - 50 ))) /
                    Math.PI
                )
              )
          );
        }
      } else {
        if (
          (180 * Math.atan((50  - cursorY) / (cursorX - 50 ))) /
            Math.PI <
          0
        ) {
          setAngle(
            180 +
              Math.floor(
                (180 *
                  Math.atan((50  - cursorY) / (cursorX - 50 ))) /
                  Math.PI
              )
          );
        } else {
          setAngle(
            Math.abs(
              Math.floor(
                (180 *
                  Math.atan((50  - cursorY) / (cursorX - 50 ))) /
                  Math.PI
              )
            )
          );
        }
            }
    }
  };
const rotateTime=1000
const handleSetAngle = (newAngle: number) => {
  let oldAngle=angle
  let time = 0;
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (time >= rotateTime) {
          setAngle(newAngle);
          clearInterval(interval);
          resolve(void 0);
        } else {
          setAngle((prevAngle) => prevAngle + ((newAngle - oldAngle) * 50) / rotateTime);
          time += 50;
        }
      }, 50);
    });
}
  return (
    <div className="w-100 flex flex-col xl:flex-row">  {/* row */}
      <div
        className="flex flex-col justify-center items-center w-100 xl:w-1/4 " 
      >{/* col xl-4 */}
        <div className="flex justify-center items-center flex-wrap w-100 p-3 lg:p-5">
          <label htmlFor="angle-input">Angle:</label>
          <input
            type="range"
            name=""
            id="angle-input"
            className=" w-1/2"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            min="0"
            max="360"
          />
           <input
              type="number"
              className="px-0 py-2 text-center w-1/4 border border-blue-400 rounded-lg"
              value={angle}
              onChange={(e) => {
                if (Number(e.target.value) >= 0 && Number(e.target.value) <= 360) {
                  setAngle(Number(e.target.value));
                }
              }}
              min={0}
              max={359}
            />
                        <span className="py-0 text-lg"><sup>°</sup></span>

        </div>
        <div className="flex flex-row xl:flex-col justify-center flex-wrap">
          <button  onClick={() => handleSetAngle(0)}  className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${angle==0&&'dark:text-white dark:bg-blue-500 text-white bg-blue-800'}`}>Zero Angle</button>
          <button  onClick={() => handleSetAngle(90)}  className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${angle==90&&'dark:text-white dark:bg-blue-500 text-white bg-blue-800'}`}>Right Angle</button>
          <button  onClick={() => handleSetAngle(180)}  className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${angle==180&&'dark:text-white dark:bg-blue-500 text-white bg-blue-800'}`}>Straight Angle</button>
          <button  onClick={() => handleSetAngle(360)}  className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${angle==360&&'dark:text-white dark:bg-blue-500 text-white bg-blue-800'}`}>Full Angle</button>
        </div>
      </div>
      <div  className="w-100 xl:w-3/4"> {/* col xl-8 */}
        <div className="angle-main" ref={outerBox}>
          <svg
            width='100%'
            xmlns="http://www.w3.org/2000/svg"
            ref={svgBox}
            className="angle-svg "
            cursor={dragging ? "grabbing" : "default"}
            onMouseUp={() => setDragging(false)}
            onTouchEnd={() => setDragging(false)}
            onMouseMove={(e) => handleDrag(e)}
            onTouchMove={(e) => handleDrag(e)}
            viewBox="0 0 100 100"
          >
            {/* Highlights */}
            {/* Lines */}
            <line
              id="line1"
              x1={50}
              y1={50}
              x2={100}
              y2={50}
              stroke="black"
              strokeWidth="1"
            />
            <line
              id="line2"
              x1={50}
              y1={50}
              x2={(50 + x * 50)}
              y2={(50 - y * 40)}
              stroke="black"
              strokeWidth="1"
              cursor={dragging ? "grabbing" : "grab"}
              onMouseDown={() => setDragging(true)}
              onTouchStart={() => setDragging(true)}
            />
            <line
              id="line2dummy"
              x1={50}
              y1={50}
              x2={50 + x * 50}
              y2={50 - y * 40}
              stroke="transparent"
              strokeWidth="5"
              cursor={dragging ? "grabbing" : "grab"}
              onMouseDown={() => setDragging(true)}
              onTouchStart={() => setDragging(true)}
            />
            
            {angle == 360 ? (
              <circle
                r={4 }
                cx={50 }
                cy={50 }
                stroke="blue"
                strokeWidth="0.3"
                fill="none"
              ></circle>
            ) : angle == 90 ? (
              <path
                id="angle1"
                d={`M ${(50 + 4 * x)} ${(50 - y * 4)} h ${
                  4 
                } v ${4 }`}
                stroke="blue"
                strokeWidth="0.3"
                fill="none"
              />
            ) : (
              <path
                id="angle1"
                d={`M ${(50 + 4 * x)} ${(50 - y * 4) } a ${
                  4 
                } ${4 } 0 ${angle > 180 ? 1 : 0} 1  ${
                  (1 - x) * 4 
                } ${4 * y }`}
                stroke="blue"
                strokeWidth="0.3"
                fill="none"
              />
            )}

            <text
              id="angle1Text"
              x={`${(50 + Math.cos((angle * Math.PI) / 360) * 8) }`}
              y={`${(50 - Math.sin((angle * Math.PI) / 360) * 8) }`}
              alignmentBaseline="middle"
              textAnchor="middle"
              fontSize={3}
              fill="blue"
            >
              {Math.round(angle)}°
            </text>
            <text
              id="angle1Text"
              x={`${(50 + Math.cos((angle * Math.PI) / 360) * 20) }`}
              y={`${(50 - Math.sin((angle * Math.PI) / 360) * 20) }`}
              alignmentBaseline="middle"
              textAnchor="middle"
              fontSize={3}
              fill="blue"
            >
              {angleType} angle
            </text>
            <text
              x={35 }
              y={25 }
              alignmentBaseline="middle"
              textAnchor="middle"
              fontSize={3}
              fill="blue"
              className="animated1"
            >← Drag this line
            </text>
          </svg>
        </div>
      </div>
      
    </div>
  );
}

export default Angle;
