import React, { useEffect, useRef, useState } from "react";

function Parallel() {
  const svgBox = useRef<SVGSVGElement>(null);
  const outerBox = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState<number>(1);
  const [boxHeight, setBoxHeight] = useState<number>(1);
  const [unit, setUnit] = useState<number>(1);
  const [angle, setAngle] = useState<number>(45);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [dX, setDX] = useState<number>(0);
  const [d, setD] = useState<number>(12);
  const [dragging, setDragging] = useState<boolean>(false);
  const [ySign, setYSign] = useState<number>(1);
  const [r, setR] = useState<number>(10);
  const [show, setShow] = useState<any>({ angle: true, letter: true, curve: false });
  const [activeBtn, setActiveBtn] = useState<string>("");
  const [highlight, setHighlight] = useState<any>({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
  });
  const [pairType, setPairType] = useState("Corresponding");

  useEffect(() => {
    setX(Math.cos((angle * Math.PI) / 180));
    setY(Math.sin((angle * Math.PI) / 180));
    setDX(d / Math.tan((angle * Math.PI) / 180));
  }, [angle, d]);

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
    if(svgBox.current){const svgRect = svgBox.current.getBoundingClientRect();
    if (e.type === "mousedown") {
      e.preventDefault();
      startX = (e.clientX - svgRect.left)*100/svgRect.width;
      startY = (e.clientY - svgRect.top)*100/svgRect.height;
    } else if (e.type === "touchstart") {
      startX = (e.changedTouches[0].clientX - svgRect.left)*100/svgRect.width;
      startY = (e.changedTouches[0].clientY - svgRect.top)*100/svgRect.height;
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
    }}
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
        } else if (
          (180 * Math.atan((50  - cursorY) / (cursorX - 50 ))) /
            Math.PI >
          0
        ) {
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
  const clearHighlights = () => {
    let tempHighlight = highlight;
    for (let key in tempHighlight) {
      tempHighlight[key] = false;
    }
    setHighlight(tempHighlight);
  };
  const renderPairButton = (A: string, B: string) => {
    return (
      <button
        id={`btn-${A} & ${B}`}
        className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
          activeBtn === `${A} & ${B}` &&
          "dark:text-white dark:bg-blue-500 text-white bg-blue-800"
        }`}
        value={`${A} & ${B}`}
        onClick={() => {
          let tempHighlight = highlight;
          for (let key in tempHighlight) {
            tempHighlight[key] = false;
          }
          setHighlight({ ...tempHighlight, [A]: true, [B]: true });
          setActiveBtn(`${A} & ${B}`);
        }}
        // active={activeBtn === `${A} & ${B}`}
      >
        {`${A} & ${B}`}
      </button>
    );
  };
  return (
    <div className="w-100 flex flex-col xl:flex-row"> {/*Row*/}
      <div className="w-100 xl:w-1/3"> {/*Col xl={4} md={5}*/}
        <div className="flex flex-col sm:flex-row xl:flex-col flex-wrap justify-start items-center xl:items-start px-2 lg:px-5">
          <div className="flex justify-between items-center w-100 lg:p-3 xl:pt-5 m-2">
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
            <input
              className="px-0 py-2 text-center border border-blue-400 rounded-lg"
              type="number"
              value={angle}
              onChange={(e) => {
                if (Number(e.target.value) >= 0 && Number(e.target.value) <= 180) {
                  setAngle(Number(e.target.value));
                }
              }}
              min={0}
              max={180}
            />
            <sup className="py-0 text-sm">°</sup>
          </div>
          <div className="flex justify-between items-center w-100  lg:p-3 m-2">
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
            <input
              className="px-0 py-2 text-center border border-blue-400 rounded-lg"
              type="number"
              value={180 - angle}
              onChange={(e) => {
                if (Number(e.target.value) >= 0 && Number(e.target.value) <= 180) {
                  setAngle(180 - Number(e.target.value));
                }
              }}
              min={0}
              max={180}
            />
            <sup className="py-0 text-sm">°</sup>
          </div>
          <div className="flex justify-evenly items-center w-100  lg:p-3 m-2">
            <label htmlFor="angle-input">Distance :</label>
            <input
              type="range"
              name=""
              id="angle-input"
              className="form-range"
              value={d}
              onChange={(e) => setD(parseInt(e.target.value))}
              min={8}
              max={40}
            />
          </div>
        </div>
        <div className="d-flex flex-md-column justify-content-start align-items-center px-2 px-lg-5">
          
        </div>
        <div className="p-2 lg:ps-8">
          <h3>Highlight</h3>
          <div className="d-flex ">
            <button
            className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
              activeBtn === "Interior" &&
              "dark:text-white dark:bg-blue-500 text-white bg-blue-800"
            }`}
              onClick={() => {
                setHighlight({
                  A: false,
                  B: false,
                  C: true,
                  D: true,
                  E: true,
                  F: true,
                  G: false,
                  H: false,
                });
                setActiveBtn("Interior");
              }}
              // active={activeBtn === "Interior"}
            >
              Interior angles
            </button>

            <button
              // variant="outline-primary"
              onClick={() => {
                setHighlight({
                  A: true,
                  B: true,
                  C: false,
                  D: false,
                  E: false,
                  F: false,
                  G: true,
                  H: true,
                });
                setActiveBtn("Exterior");
              }}
              className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
                activeBtn === "Exterior" &&
          "dark:text-white dark:bg-blue-500 text-white bg-blue-800"
        }`}
              // active={activeBtn === "Exterior"}
            >
              Exterior angles
            </button>
          </div>

          <div className="flex justify-start items-center flex-wrap">
            <div>
              <label htmlFor="pairType" className="mt-3">
                Select pair type : 
              </label>
              <select
                className="text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 bg-transparent"
                id="pairType"
                onChange={(e) => {
                  setPairType(e.target.value);
                  clearHighlights();
                }}
              >
                <option value="Corresponding">Corresponding angles</option>
                <option value="Alternate-interior">
                  Alternate interior angles
                </option>
                <option value="Alternate-exterior">
                  Alternate exterior angles
                </option>
                <option value="Co-interior">Co-interior angles</option>
    
                <option value="Co-exterior">Co-exterior angles</option>
              </select>
            </div>
            <div>
              {pairType == "Corresponding" && (
                < >
                    {renderPairButton("A", "E")}
                    {renderPairButton("B", "F")}
                    {renderPairButton("C", "G")}
                    {renderPairButton("D", "H")}
                </>
              )}
              {pairType == "Alternate-interior" && (
                <>
                  <div> {/*buttongroup */}
                    {renderPairButton("C", "E")}
                    {renderPairButton("D", "F")}
                  </div>
                </>
              )}
              {pairType == "Alternate-exterior" && (
                <>
                  <div> {/*buttongroup */}
                    {renderPairButton("A", "G")}
                    {renderPairButton("B", "H")}
                  </div>
                </>
              )}
              {pairType == "Co-exterior" && (
                <>
                  <div> {/*buttongroup */}
                    {renderPairButton("A", "H")}
                    {renderPairButton("B", "G")}
                  </div>
                </>
              )}
              {pairType == "Co-interior" && (
                <>
                  <div> {/*buttongroup */}
                    {renderPairButton("C", "F")}
                    {renderPairButton("D", "E")}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                {
                  clearHighlights();
                  setActiveBtn("");
                }
              }}
              className={`text-blue-700  border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500`}
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
      <div className="w-full xl:w-8/12"> {/*Col xl={8} md={7}*/}
        <div className="angle-main" ref={outerBox}>
          <svg
            width={'100%'}
            xmlns="http://www.w3.org/2000/svg"
            ref={svgBox}
            className="angle-svg"
            cursor={dragging ? "grabbing" : "default"}
            onMouseUp={() => setDragging(false)}
            onTouchEnd={() => setDragging(false)}
            onMouseMove={(e) => handleDrag(e)}
            onTouchMove={(e) => handleDrag(e)}
            viewBox="0 0 100 100"
          >
            {/* Highlights */}

            {highlight.A && (
              <path
                id="highlightA"
                d={`M ${(50 + dX + x * r) },${(50 - d - y * r) } 
              L ${(50 + dX) },${(50 - d) }
               L ${(50 + dX + r) },${(50 - d) } 
               A ${r } ${r } 0 0 0 ${(50 + dX + x * r) },${
                  (50 - d - y * r) 
                } Z`}
                fill="lightblue"
              />
            )}
            {highlight.B && (
              <path
                id="highlightB"
                d={`M ${(50 + dX - r) },${(50 - d) } 
              L ${(50 + dX) },${(50 - d) } 
              L ${(50 + dX + x * r) },${(50 - d - y * r) }
               A ${r } ${r } 0 0 0 ${(50 + dX - r) },${
                  (50 - d) 
                } Z`}
                fill="lightgreen"
              />
            )}
            {highlight.C && (
              <path
                id="highlightC"
                d={`M ${(50 + dX - x * r) },${
                  (50 - d + y * r) 
                } L ${(50 + dX) },${(50 - d) } L ${
                  (50 + dX - r) 
                },${(50 - d) } A ${r } ${r } 0 0 0 ${
                  (50 + dX - x * r) 
                },${(50 - d + y * r) } Z`}
                fill="lightblue"
              />
            )}
            {highlight.D && (
              <path
                id="highlightD"
                d={`M ${(50 + dX + r) },${(50 - d) } L ${
                  (50 + dX) 
                },${(50 - d) } L ${(50 + dX - x * r) },${
                  (50 - d + y * r) 
                } A ${r } ${r } 0 0 0 ${(50 + dX + r) },${
                  (50 - d) 
                } Z`}
                fill="lightgreen"
              />
            )}

            {highlight.E && (
              <path
                id="highlightE"
                d={`M ${(50 - dX + x * r) },${(50 + d - y * r) } 
              L ${(50 - dX) },${(50 + d) }
               L ${(50 - dX + r) },${(50 + d) } 
               A ${r } ${r } 0 0 0 ${(50 - dX + x * r) },${
                  (50 + d - y * r) 
                } Z`}
                fill="lightblue"
              />
            )}
            {highlight.F && (
              <path
                id="highlightF"
                d={`M ${(50 - dX - r) },${(50 + d) } 
              L ${(50 - dX) },${(50 + d) } 
              L ${(50 - dX + x * r) },${(50 + d - y * r) }
               A ${r } ${r } 0 0 0 ${(50 - dX - r) },${
                  (50 + d) 
                } Z`}
                fill="lightgreen"
              />
            )}
            {highlight.G && (
              <path
                id="highlightG"
                d={`M ${(50 - dX - x * r) },${
                  (50 + d + y * r) 
                } L ${(50 - dX) },${(50 + d) } L ${
                  (50 - dX - r) 
                },${(50 + d) } A ${r } ${r } 0 0 0 ${
                  (50 - dX - x * r) 
                },${(50 + d + y * r) } Z`}
                fill="lightblue"
              />
            )}
            {highlight.H && (
              <path
                id="highlightH"
                d={`M ${(50 - dX + r) },${(50 + d) } L ${
                  (50 - dX) 
                },${(50 + d) } L ${(50 - dX - x * r) },${
                  (50 + d + y * r) 
                } A ${r } ${r } 0 0 0 ${(50 - dX + r) },${
                  (50 + d) 
                } Z`}
                fill="lightgreen"
              />
            )}
            {/* lines */}
            <line
              id="line1"
              x1={`${0 }px`}
              y1={`${(50 + d) }px`}
              x2={`${100 }px`}
              y2={`${(50 + d) }px`}
              stroke="black"
              strokeWidth="1"
            />

            <line
              id="line2"
              x1={`${0 }px`}
              y1={`${(50 - d) }px`}
              x2={`${100 }px`}
              y2={`${(50 - d) }px`}
              stroke="black"
              strokeWidth="1"
            />
            <line
              id="line3"
              x1={`${(50 - x * 65) }px`}
              y1={`${(50 + y * 65) }px`}
              x2={`${(50 + x * 65) }px`}
              y2={`${(50 - y * 65) }px`}
              stroke="black"
              strokeWidth="1"
              cursor={dragging ? "grabbing" : "grab"}
              onMouseDown={(e) => handleSetDragging(e)}
              onTouchStart={(e) => handleSetDragging(e)}
            />
            <line
              id="line3dummy"
              x1={`${(50 - x * 65) }px`}
              y1={`${(50 + y * 65) }px`}
              x2={`${(50 + x * 65) }px`}
              y2={`${(50 - y * 65) }px`}
              stroke="transparent"
              strokeWidth="5"
              cursor={dragging ? "grabbing" : "grab"}
              onMouseDown={(e) => handleSetDragging(e)}
              onTouchStart={(e) => handleSetDragging(e)}
            />
            {angle != 0 && (
              <>
                {/* curves */}
                {show.curve && (
                  <>
                    <path
                      id="angleA"
                      d={`M ${(50 + dX + 4 * x) } ${
                        (50 - y * 4 - d) 
                      } a ${4 } ${4 } 0 0 1  ${
                        (1 - x) * 4 
                      } ${4 * y }`}
                      stroke="blue"
                      strokeWidth="0.3"
                      fill="none"
                    />
                    <path
                      id="angleB"
                      d={`M ${(50 + dX - 5.5) } ${(50 - d) } a ${
                        -5.5 
                      } ${-5.5 } 0 0 1  ${(x + 1) * 5.5 } ${
                        -5.5 * y 
                      }`}
                      stroke="green"
                      strokeWidth="0.3"
                      fill="none"
                    />
                    <path
                      id="angleC"
                      d={`M ${(50 + dX - 4.5 * x) } ${
                        (50 - d + y * 4.5) 
                      } a ${4.5 } ${4.5 } 0 0 1  ${
                        -(1 - x) * 4.5 
                      } ${-(4.5 * y) }`}
                      stroke="blue"
                      strokeWidth="0.3"
                      fill="none"
                    />
                    <path
                      id="angleD"
                      d={`M ${(50 + dX + 5) } ${(50 - d) } a ${
                        -5 
                      } ${-5 } 0 0 1  ${-(x + 1) * 5 } ${
                        5 * y 
                      }`}
                      stroke="green"
                      strokeWidth="0.3"
                      fill="none"
                    />
                    <path
                      id="angleE"
                      d={`M ${(50 - dX + 4 * x) } ${
                        (50 - y * 4 + d) 
                      } a ${4 } ${4 } 0 0 1  ${
                        (1 - x) * 4 
                      } ${4 * y }`}
                      stroke="blue"
                      strokeWidth="0.3"
                      fill="none"
                    />
                    <path
                      id="angleF"
                      d={`M ${(50 - dX - 5.5) } ${(50 + d) } a ${
                        -5.5 
                      } ${-5.5 } 0 0 1  ${(x + 1) * 5.5 } ${
                        -5.5 * y 
                      }`}
                      stroke="green"
                      strokeWidth="0.3"
                      fill="none"
                    />
                    <path
                      id="angleG"
                      d={`M ${(50 - dX - 4.5 * x) } ${
                        (50 + d + y * 4.5) 
                      } a ${4.5 } ${4.5 } 0 0 1  ${
                        -(1 - x) * 4.5 
                      } ${-(4.5 * y) }`}
                      stroke="blue"
                      strokeWidth="0.3"
                      fill="none"
                    />
                    <path
                      id="angleH"
                      d={`M ${(50 - dX + 5) } ${(50 + d) } a ${
                        -5 
                      } ${-5 } 0 0 1  ${-(x + 1) * 5 } ${
                        5 * y 
                      }`}
                      stroke="green"
                      strokeWidth="0.3"
                      fill="none"
                    />
                  </>
                )}
                {/* angle */}
                {show.angle && (
                  <>
                    <text
                      id="angleAText"
                      x={`${
                        (50 + dX + Math.cos((angle * Math.PI) / 360) * 8) 
                      }`}
                      y={`${
                        (50 - d - Math.sin((angle * Math.PI) / 360) * 8) 
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="blue"
                    >
                      {angle}°
                    </text>
                    <text
                      id="angleBText"
                      x={`${
                        (50 +
                          dX -
                          Math.cos(((180 - angle) * Math.PI) / 360) * 7) *
                        unit
                      }`}
                      y={`${
                        (50 -
                          d -
                          Math.sin(((180 - angle) * Math.PI) / 360) * 7) *
                        unit
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="green"
                    >
                      {180 - angle}°
                    </text>
                    <text
                      id="angleCText"
                      x={`${
                        (50 + dX - Math.cos((angle * Math.PI) / 360) * 7) 
                      }`}
                      y={`${
                        (50 - d + Math.sin((angle * Math.PI) / 360) * 7) 
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="blue"
                    >
                      {angle}°
                    </text>
                    <text
                      id="angleDText"
                      x={`${
                        (50 +
                          dX +
                          Math.cos(((180 - angle) * Math.PI) / 360) * 7) *
                        unit
                      }`}
                      y={`${
                        (50 -
                          d +
                          Math.sin(((180 - angle) * Math.PI) / 360) * 7) *
                        unit
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="green"
                    >
                      {180 - angle}°
                    </text>
                    <text
                      id="angleEtext"
                      x={`${
                        (50 - dX + Math.cos((angle * Math.PI) / 360) * 6) *
                        unit
                      }`}
                      y={`${
                        (50 + d - Math.sin((angle * Math.PI) / 360) * 6) 
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="blue"
                    >
                      {180 - angle}°
                    </text>
                    <text
                      id="angleFText"
                      x={`${
                        (50 -
                          dX -
                          Math.cos(((180 - angle) * Math.PI) / 360) * 7) *
                        unit
                      }`}
                      y={`${
                        (50 +
                          d -
                          Math.sin(((180 - angle) * Math.PI) / 360) * 7) *
                        unit
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="green"
                    >
                      {180 - angle}°
                    </text>
                   
                    <text
                      id="angleGText"
                      x={`${
                        (50 - dX - Math.cos((angle * Math.PI) / 360) * 7) 
                      }`}
                      y={`${
                        (50 + d + Math.sin((angle * Math.PI) / 360) * 7) 
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="blue"
                    >
                      {angle}°
                    </text>
                    <text
                      id="angleHText"
                      x={`${
                        (50 -
                          dX +
                          Math.cos(((180 - angle) * Math.PI) / 360) * 7) *
                        unit
                      }`}
                      y={`${
                        (50 +
                          d +
                          Math.sin(((180 - angle) * Math.PI) / 360) * 7) *
                        unit
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="green"
                    >
                      {180 - angle}°
                    </text>
                  </>
                )}
                {show.letter && (
                  <>
                    <text
                      id="textA"
                      x={`${
                        (50 + dX + Math.cos((angle * Math.PI) / 360) * 12) *
                        unit
                      }`}
                      y={`${
                        (50 - d - Math.sin((angle * Math.PI) / 360) * 12) 
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="blue"
                    >
                      A
                    </text>
                    <text
                      id="textB"
                      x={`${
                        (50 +
                          dX -
                          Math.cos(((180 - angle) * Math.PI) / 360) * 11) *
                        unit
                      }`}
                      y={`${
                        (50 -
                          d -
                          Math.sin(((180 - angle) * Math.PI) / 360) * 11) *
                        unit
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="green"
                    >
                      B
                    </text>
                    <text
                      id="textC"
                      x={`${
                        (50 + dX - Math.cos((angle * Math.PI) / 360) * 10) *
                        unit
                      }`}
                      y={`${
                        (50 - d + Math.sin((angle * Math.PI) / 360) * 10) 
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="blue"
                    >
                      C
                    </text>
                    <text
                      id="textD"
                      x={`${
                        (50 +
                          dX +
                          Math.cos(((180 - angle) * Math.PI) / 360) * 10) *
                        unit
                      }`}
                      y={`${
                        (50 -
                          d +
                          Math.sin(((180 - angle) * Math.PI) / 360) * 10) *
                        unit
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="green"
                    >
                      D
                    </text>
                    <text
                      id="textE"
                      x={`${
                        (50 - dX + Math.cos((angle * Math.PI) / 360) * 10) *
                        unit
                      }`}
                      y={`${
                        (50 + d - Math.sin((angle * Math.PI) / 360) * 10) 
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="blue"
                    >
                      E
                    </text>
                    <text
                      id="textF"
                      x={`${
                        (50 -
                          dX -
                          Math.cos(((180 - angle) * Math.PI) / 360) * 10) *
                        unit
                      }`}
                      y={`${
                        (50 +
                          d -
                          Math.sin(((180 - angle) * Math.PI) / 360) * 10) *
                        unit
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="green"
                    >
                      F
                    </text>
                    <text
                      id="textG"
                      x={`${
                        (50 - dX - Math.cos((angle * Math.PI) / 360) * 10) *
                        unit
                      }`}
                      y={`${
                        (50 + d + Math.sin((angle * Math.PI) / 360) * 10) 
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="blue"
                    >
                      G
                    </text>
                    <text
                      id="textH"
                      x={`${
                        (50 -
                          dX +
                          Math.cos(((180 - angle) * Math.PI) / 360) * 10) *
                        unit
                      }`}
                      y={`${
                        (50 +
                          d +
                          Math.sin(((180 - angle) * Math.PI) / 360) * 10) *
                        unit
                      }`}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fontSize={2}
                      fill="green"
                    >
                      H
                    </text>

                  </>
                )}
              </>
            )}
            <text
              x={65 }
              y={15 }
              alignmentBaseline="middle"
              textAnchor="middle"
              fontSize={2}
              fill="blue"
              className="animated1"
            >Drag this line →
            </text>
            <text>
              
            </text>

          </svg>
        </div>
      </div>
    </div>
  );
}

export default Parallel;
