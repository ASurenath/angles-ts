import React, { useEffect, useRef, useState } from "react";

function Intersect() {
  const svgBox = useRef<SVGSVGElement>(null);
  const outerBox = useRef<HTMLDivElement>(null);
  // const [boxWidth, setBoxWidth] = useState<number>(1);
  const [boxHeight, setBoxHeight] = useState<number>(1);
  const [unit, setUnit] = useState<number>(1);
  const [angle, setAngle] = useState<number>(45);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [ySign, setYSign] = useState<number>(1);
  const [pairType, setPairType] = useState<string>("Vertical");
  const [show, setShow] = useState<any>({
    angle: true,
    letter: true,
    curve: true,
  });
  const [activeBtn, setActiveBtn] = useState<string>("");
  const [highlight, setHighlight] = useState<any>({
    A: false,
    B: false,
    C: false,
    D: false,
  });
  useEffect(() => {
    setX(Math.cos((angle * Math.PI) / 180));
    setY(Math.sin((angle * Math.PI) / 180));
  }, [angle]);

  // useEffect(() => {
  //   const updateBoxDimensions = () => {
  //     // Update box width and height
  //     if (outerBox.current) {
  //       setBoxWidth(outerBox.current.getBoundingClientRect().width);
  //       setBoxHeight(outerBox.current.getBoundingClientRect().height);
  //       setUnit(
  //         Math.min(
  //           outerBox.current.getBoundingClientRect().width / 100,
  //           outerBox.current.getBoundingClientRect().height / 100
  //         )
  //       );
  //     }
  //   };

  //   updateBoxDimensions();
  //   window.addEventListener("resize", updateBoxDimensions);
  //   return () => {
  //     window.removeEventListener("resize", updateBoxDimensions);
  //   };
  // }, [outerBox]);
  // const angleSvg = (
  //   <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
  //     <line x1="0" y1="15" x2="20" y2="15" stroke="blue" strokeWidth="1" />
  //     <line x1="0" y1="15" x2="9" y2="0" stroke="blue" strokeWidth="1" />
  //     <path
  //       d="M5,5 A5,5 0 0,1 10,15"
  //       fill="none"
  //       stroke="blue"
  //       strokeWidth="1"
  //     />
  //   </svg>
  // );
  const handleSetDragging = (e: any) => {
    setDragging(true);
    let startX: number = 0;
    let startY: number = 0;
    if (svgBox.current) {
      const svgRect = svgBox.current.getBoundingClientRect();
      if (e.type === "mousedown") {
        e.preventDefault();
        startX = (e.clientX - svgRect.left) * 100 / svgRect.width;
        startY = (e.clientY - svgRect.top) * 100 / svgRect.height;
      } else if (e.type === "touchstart") {
        startX =( e.changedTouches[0].clientX - svgRect.left)*100/svgRect.width
        startY = (e.changedTouches[0].clientY - svgRect.top)*100/svgRect.height
      }
      if (startY > 50 ) {
        setYSign(-1);
      } else if (startY < 50 ) {
        setYSign(1);
      } else {
        if (startX < 50 ) {
          setYSign(1);
        } else {
          setYSign(-1);
        }
      }
    }
  };
  const handleDrag = (e: any) => {
    // e.preventDefault()
    if (dragging && svgBox.current) {
      let cursorX: number = 0;
      let cursorY: number = 0;
      const svgRect = svgBox.current.getBoundingClientRect();
      if (e.type === "mousemove") {
        e.preventDefault();
        cursorX = (e.clientX - svgRect.left)*100/svgRect.width;
        cursorY = (e.clientY - svgRect.top)*100/svgRect.height;
      } else if (e.type === "touchmove") {
        cursorX = (e.changedTouches[0].clientX - svgRect.left)*100/svgRect.width;
        cursorY = (e.changedTouches[0].clientY - svgRect.top)*100/svgRect.height;
      }
      if (
        (50  - cursorY > 0 && ySign > 0) ||
        (50  - cursorY < 0 && ySign < 0)
      ) {
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
  return (
    <div className="w-100 flex flex-col xl:flex-row">
      {" "}
      {/*Row*/}
      <div className="xl:w-1/3  w-100">
        {" "}
        {/* col xl={4} md={5} */}
        <div className="flex flex-col sm:flex-row xl:flex-col justify-center items-start px-3 lg:px-5">
          <div className="flex justify-between items-center w-100 lg:p-3 xl:pt-5">
            <label htmlFor="angleA-input">∠ A:</label>
            <input
              type="range"
              name=""
              id="angleA-input"
              className="form-range w-50"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              min="0"
              max="180"
            />
            <div className="flex">
              <input
                className="px-0 py-2 text-center border border-blue-400 rounded-lg"
                type="number"
                value={angle}
                onChange={(e) => {
                  if (
                    Number(e.target.value) >= 0 &&
                    Number(e.target.value) <= 180
                  ) {
                    setAngle(Number(e.target.value));
                  }
                }}
                min={0}
                max={180}
              />
              <sup className="py-0 text-sm">°</sup>
            </div>
          </div>
          <div className="flex justify-between items-center w-100  lg:p-3">
            <label htmlFor="angleB-input">∠ B:</label>
            <input
              type="range"
              name=""
              id="angleA-input"
              className="form-range w-50"
              value={180 - angle}
              onChange={(e) => setAngle(180 - Number(e.target.value))}
              min="0"
              max="180"
            />
            <div className="flex">
              <input
                className="px-0 py-2 text-center border border-blue-400 rounded-lg"
                type="number"
                value={180 - angle}
                onChange={(e) => {
                  if (
                    Number(e.target.value) >= 0 &&
                    Number(e.target.value) <= 180
                  ) {
                    setAngle(180 - Number(e.target.value));
                  }
                }}
                min={0}
                max={180}
              />
              <span className="py-0 text-sm">°</span>
            </div>
          </div>
        </div>
        <div className="p-2 lg:ps-8">
          <h5>Highlight pairs</h5> <h3>Vertical angles:</h3>
          <p>Opposite angles in a pair of intersecting lines</p>
          <div>
            {" "}
            {/**Buttongroup */}
            <button
              className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
                activeBtn === "A & C" &&
                "dark:text-white dark:bg-blue-500 text-white bg-blue-800"
              }`}
              id="tbg-btn-1"
              value={"A & C"}
              onClick={() => {
                setHighlight({ A: true, B: false, C: true, D: false });
                setActiveBtn("A & C");
              }}

              // active={activeBtn === "A & C"} //TODO: fix later
            >
              A & C
            </button>
            <button
              id="tbg-btn-2"
              className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
                activeBtn === "B & D" &&
                "dark:text-white dark:bg-blue-500 text-white bg-blue-800"
              }`}
              value={"B & D"}
              onClick={() => {
                setHighlight({ A: false, B: true, C: false, D: true });
                setActiveBtn("B & D");
              }}
              // active={activeBtn === "B & D"} //TODO: fix later
            >
              B & D
            </button>
          </div>
          <h3>Adjacent Supplementary Angles:</h3>
          <p>
            Adjacent angles share a common vertex and side. In case of
            intersecting pair of lines adjacent angles are also supplementary
            angles, i.e., they adds up to 180°
          </p>
          <div>
            {" "}
            {/**Buttongroup */}
            <button
              id="tbg-btn-3"
              className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
                activeBtn === "A & B" &&
                "dark:text-white dark:bg-blue-500 text-white bg-blue-800"
              }`}
              value={"A & B"}
              onClick={() => {
                setHighlight({ A: true, B: true, C: false, D: false });
                setActiveBtn("A & B");
              }}
              // active={activeBtn === "A & B"} //TODO: fix later
            >
              A & B
            </button>
            <button
              id="tbg-btn-4"
              className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
                activeBtn === "B & C" &&
                "dark:text-white dark:bg-blue-500 text-white bg-blue-800"
              }`} 
              value={"B & C"}
              onClick={() => {
                setHighlight({ A: false, B: true, C: true, D: false });
                setActiveBtn("B & C");
              }}
              // active={activeBtn === "B & C"} //TODO: fix later
            >
              B & C
            </button>
            <button
              id="tbg-btn-5"
              className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
                activeBtn === "C & D" &&
                "dark:text-white dark:bg-blue-500 text-white bg-blue-800"
              }`} 
              value={"C & D"}
              onClick={() => {
                setHighlight({ A: false, B: false, C: true, D: true });
                setActiveBtn("C & D");
              }}
              // active={activeBtn === "C & D"}   //TODO: fix later
            >
              C & D
            </button>
            <button
              id="tbg-btn-6"
              className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
                activeBtn === "D & A" &&
                "dark:text-white dark:bg-blue-500 text-white bg-blue-800"
              }`}
              value={"D & A"}
              onClick={() => {
                setHighlight({ A: true, B: false, C: false, D: true });
                setActiveBtn("D & A");
              }}
              // active={activeBtn === "D & A"}   //TODO: fix later
            >
              D & A
            </button>
          </div>
          <div className="pt-4">
            <button
            className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 `}
              onClick={() => {
                {
                  setHighlight({ A: false, B: false, C: false, D: false });
                  setActiveBtn("");
                }
              }}
            >
              Clear highlights
            </button>
          </div>
          <div className="pt-4">
            <p>Show/hide:</p>
            <div className="me-2 flex justify-start items-center">
              {" "}
              {/*Buttongroup */}
              <button
              className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
                show.letter &&
                "dark:text-white dark:bg-blue-500 text-white bg-blue-800"
              }`}
                onClick={() => setShow({ ...show, letter: !show.letter })}
                // active={show.letter} // TODO: fix later
                title="Angle name"
              >
                <span className={show.letter ? "none" : "strikethrough"}>
                  &nbsp;&nbsp;A&nbsp;&nbsp;
                </span>
              </button>
              <button
              className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
                show.angle &&
                "dark:text-white dark:bg-blue-500 text-white bg-blue-800"
              }`}
                onClick={() => setShow({ ...show, angle: !show.angle })}
                // active={show.angle} // TODO: fix later
                title="Angle value"
              >
                <span className={show.angle ? "none" : "strikethrough"}>
                  &nbsp;&nbsp;45°&nbsp;&nbsp;
                </span>
              </button>
              <button
              className={`py-0 text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
                show.curve &&
                "dark:text-white dark:bg-blue-500 text-white bg-blue-800"
              }`}
                onClick={() => setShow({ ...show, curve: !show.curve })}
                // active={show.curve} // TODO: fix later
                title="Angle curve"
              >
                <span
                  className={show.curve ? "none" : "strikethrough"}
                  style={{ fontSize: "2rem" }}
                >
                  &nbsp;&#9693;&nbsp;
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full xl:w-4/6 ">
        {" "}
        {/* col xl-8 md-7*/}
        <div className="angle-main mx-auto" ref={outerBox}>
          <svg
          viewBox="0 0 100 100"
            width={'100%'}
            xmlns="http://www.w3.org/2000/svg"
            ref={svgBox}
            className="angle-svg"
            cursor={dragging ? "grabbing" : "default"}
            onMouseUp={() => setDragging(false)}
            onTouchEnd={() => setDragging(false)}
            onMouseMove={(e) => handleDrag(e)}
            onTouchMove={(e) => handleDrag(e)}
          >
            {/* Highights */}
            <path
              id="highlightA"
              d={`M ${(50 + x * 50) },${(50 - y * 50) } L ${
                50 
              },${50 } L ${100 },${50 } A ${50 } ${
                50 
              } 0 0 0 ${(50 + x * 50) },${(50 - y * 50) } Z`}
              fill="lightblue"
              visibility={highlight.A ? "visible" : "hidden"}
            />
            <path
              id="highlightB"
              d={`M ${0 },${50 } L ${50 },${50 } L ${
                (50 + x * 50) 
              },${(50 - y * 50) } A ${50 } ${50 } 0 0 0 ${
                0 
              },${50 } Z`}
              fill="lightgreen"
              visibility={highlight.B ? "visible" : "hidden"}
            />
            <path
              id="highlightC"
              d={`M ${(50 - x * 50) },${(50 + y * 50) } L ${
                50 
              },${50 } L ${0 },${50 } A ${50 } ${
                50 
              } 0 0 0 ${(50 - x * 50) },${(50 + y * 50) } Z`}
              fill="lightblue"
              visibility={highlight.C ? "visible" : "hidden"}
            />
            <path
              id="highlightD"
              d={`M ${100 },${50 } L ${50 },${50 } L ${
                (50 - x * 50) 
              },${(50 + y * 50) } A ${50 } ${50 } 0 0 0 ${
                100 
              },${50 } Z`}
              fill="lightgreen"
              visibility={highlight.D ? "visible" : "hidden"}
            />

            {/*Lines */}
            <line
              id="line1"
              x1={`${0 }px`}
              y1={`${50 }px`}
              x2={`${100 }px`}
              y2={`${50 }px`}
              stroke="black"
              strokeWidth="1"
            />
            <line
              id="line2"
              x1={`${(50 - x * 50) }px`}
              y1={`${(50 + y * 50) }px`}
              x2={`${(50 + x * 50) }px`}
              y2={`${(50 - y * 50) }px`}
              stroke="black"
              strokeWidth="1"
              cursor={dragging ? "grabbing" : "grab"}
              onMouseDown={(e) => handleSetDragging(e)}
              onTouchStart={(e) => handleSetDragging(e)}
            />
            <line
              id="line2dummy"
              x1={`${(50 - x * 50) }px`}
              y1={`${(50 + y * 50) }px`}
              x2={`${(50 + x * 50) }px`}
              y2={`${(50 - y * 50) }px`}
              stroke="transparent"
              strokeWidth="5"
              cursor={dragging ? "grabbing" : "grab"}
              onMouseDown={(e) => handleSetDragging(e)}
              onTouchStart={(e) => handleSetDragging(e)}
            />
            {/* Curves */}
            {show.curve && (
              <>
                <path
                  id="angleA"
                  d={`M ${(50 + 4 * x) } ${(50 - y * 4) } a ${
                    4 
                  } ${4 } 0 0 1  ${(1 - x) * 4 } ${4 * y }`}
                  stroke="blue"
                  strokeWidth="0.3"
                  fill="none"
                />
                <path
                  id="angleB"
                  d={`M ${(50 - 4.5 * x) } ${(50 + y * 4.5) } a ${
                    4.5 
                  } ${4.5 } 0 0 1  ${-(1 - x) * 4.5 } ${
                    -(4.5 * y) 
                  }`}
                  stroke="blue"
                  strokeWidth="0.3"
                  fill="none"
                />
                <path
                  id="angleC"
                  d={`M ${(50 - 5.5) } ${50 } a ${-5.5 } ${
                    -5.5 
                  } 0 0 1  ${(x + 1) * 5.5 } ${-5.5 * y }`}
                  stroke="green"
                  strokeWidth=".3"
                  fill="none"
                />
                <path
                  id="angleD"
                  d={`M ${(50 + 5) } ${50 } a ${-5 } ${
                    -5 
                  } 0 0 1  ${-(x + 1) * 5 } ${5 * y }`}
                  stroke="green"
                  strokeWidth=".3"
                  fill="none"
                />
              </>
            )}
            {/* angles */}
            {show.angle && (
              <>
                <text
                  id="angleAText"
                  x={`${(50 + Math.cos((angle * Math.PI) / 360) * 8) }`}
                  y={`${(50 - Math.sin((angle * Math.PI) / 360) * 8) }`}
                  alignmentBaseline="middle"
                  textAnchor="middle"
                  fontSize={3}
                  fill="blue"
                >
                  {angle}°
                </text>
                <text
                  id="angleBText"
                  x={`${
                    (50 - Math.cos(((180 - angle) * Math.PI) / 360) * 7) 
                  }`}
                  y={`${
                    (50 - Math.sin(((180 - angle) * Math.PI) / 360) * 7) 
                  }`}
                  alignmentBaseline="middle"
                  textAnchor="middle"
                  fontSize={3}
                  fill="green"
                >
                  {180 - angle}°
                </text>

                <text
                  id="angleCText"
                  x={`${(50 - Math.cos((angle * Math.PI) / 360) * 7) }`}
                  y={`${(50 + Math.sin((angle * Math.PI) / 360) * 7) }`}
                  alignmentBaseline="middle"
                  textAnchor="middle"
                  fontSize={3}
                  fill="blue"
                >
                  {angle}°
                </text>

                <text
                  id="angleDText"
                  x={`${
                    (50 + Math.cos(((180 - angle) * Math.PI) / 360) * 7) 
                  }`}
                  y={`${
                    (50 + Math.sin(((180 - angle) * Math.PI) / 360) * 7) 
                  }`}
                  alignmentBaseline="middle"
                  textAnchor="middle"
                  fontSize={3}
                  fill="green"
                >
                  {180 - angle}°
                </text>
              </>
            )}
            {/* Angle letters */}
            {show.letter && (
              <>
                <text
                  id="textA"
                  x={`${(50 + Math.cos((angle * Math.PI) / 360) * 12) }`}
                  y={`${(50 - Math.sin((angle * Math.PI) / 360) * 12) }`}
                  alignmentBaseline="middle"
                  textAnchor="middle"
                  fontSize={3}
                  fill="blue"
                >
                  A
                </text>
                <text
                  id="textB"
                  x={`${
                    (50 - Math.cos(((180 - angle) * Math.PI) / 360) * 12) 
                  }`}
                  y={`${
                    (50 - Math.sin(((180 - angle) * Math.PI) / 360) * 12) 
                  }`}
                  alignmentBaseline="middle"
                  textAnchor="middle"
                  fontSize={3}
                  fill="green"
                >
                  B
                </text>
                <text
                  id="textC"
                  x={`${(50 - Math.cos((angle * Math.PI) / 360) * 12) }`}
                  y={`${(50 + Math.sin((angle * Math.PI) / 360) * 12) }`}
                  alignmentBaseline="middle"
                  textAnchor="middle"
                  fontSize={3}
                  fill="blue"
                >
                  C
                </text>
                <text
                  id="textD"
                  x={`${
                    (50 + Math.cos(((180 - angle) * Math.PI) / 360) * 12) 
                  }`}
                  y={`${
                    (50 + Math.sin(((180 - angle) * Math.PI) / 360) * 12) 
                  }`}
                  alignmentBaseline="middle"
                  textAnchor="middle"
                  fontSize={3}
                  fill="green"
                >
                  D
                </text>
              </>
            )}
            <text
              x={65 }
              y={15 }
              alignmentBaseline="middle"
              textAnchor="middle"
              fontSize={3}
              fill="blue"
              className="animated1"
            >
              Drag this line →
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Intersect;
