import logo from './logo.svg';
import './App.css';
import Angle from './components/Angle';
import Parallel from './components/Parallel';
import { useState } from 'react';
import Intersect from './components/Intersect';
import Triangle from './components/Triangle';


function App() {
  const [module, setModule] = useState<number>(0);
  return (
    <div className="App p-1">
      <h1 className='text-center py-3 ps-1 text-5xl'>Angles</h1>
      <div className='flex flex-col sm:flex-row justify-center items-center px-1 mb-2'>
        <label htmlFor="module" className="text-lg md:text-2xl text-center">Select module :&nbsp;  </label>
        <select className=" text-lg md:text-2xl text-center p-1 bg-white border border-blue-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 accent-blue-500" onChange={(e) => setModule(Number(e.target.value))} value={module} id='module'>
          <option value={0}>Basic types of angles</option>
          <option value={1}>Intersecting lines</option>
          <option value={2}>Line intersecting parallel lines</option>
          <option value={3}>Types of triangles based on angles</option>
        </select>
      </div>
      {module == 0 && <Angle></Angle>}
      {module == 1 && <Intersect></Intersect>}
      {module == 2 && <Parallel></Parallel>}
      {module == 3 && <Triangle></Triangle>}
    </div>
  );
}

export default App;