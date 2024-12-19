import './App.css';
import { React } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import Navbar from './Components/navbar.js';
import BubbleSort from './Components/bubblesort.js';
import SelectionSort from './Components/selectionsort';
import InsertionSort from './Components/insertionsort';
import QuickSort from './Components/quicksort';
import MergeSort from './Components/mergesort';
import CountingSort from './Components/countingsort';
import ShowLogo from './Components/Utilities/showLogo.png'
import s1 from './Components/Utilities/sorting1.png'
import s2 from './Components/Utilities/sorting2.png'
import qi from './Components/Utilities/queue.webp'

const MyPage = () => {
  return (
    <div className="container">
      <div className="boxes">
        <Link to="/sorting1" style={{ textDecoration: 'none', color: 'black' }}>
          <div className="box">
            <img src={s1} alt="" />
            Sorting Part-1
          </div>
        </Link>
        <Link to="/sorting2" style={{ textDecoration: 'none', color: 'black' }}>
          <div className="box">
            <img src={s2} alt="" />
            Sorting Part-2
          </div>
        </Link>
        <Link to="/queue" style={{ textDecoration: 'none', color: 'black' }}>
          <div className="box">
            <img src={qi} alt="" />
            Queue
          </div>
        </Link>
      </div>
      <Routes>
        <Route path='/sorting1*' element={<Sorting1 />} />
        <Route path='/sorting2*' element={<Sorting2 />} />
        <Route path='/queue*' element={<Queue />} />
      </Routes>
    </div>
  )
}

const Sorting1 = () => {
  return (
    <>
      <nav>
        <NavLink to="/sorting1/bubblesort" className={({ isActive }) => (isActive ? 'active' : '')}>Bubble Sort</NavLink>
        <NavLink to="/sorting1/selectionsort" className={({ isActive }) => (isActive ? 'active' : '')}>Selection Sort</NavLink>
        <NavLink to="/sorting1/insertionsort" className={({ isActive }) => (isActive ? 'active' : '')}>Insertion Sort</NavLink>
        <NavLink to="/sorting1/quicksort" className={({ isActive }) => (isActive ? 'active' : '')}>Quick Sort</NavLink>
      </nav>
      {/* <div className="s1_homepage"> */}
      <Routes>
        <Route index element={<BubbleSort/>}/>
        <Route path='/bubblesort' element={<BubbleSort />} />
        <Route path='/selectionsort' element={<SelectionSort/>} />
        <Route path='/insertionsort' element={<InsertionSort/>} />
        <Route path='/quicksort' element={<QuickSort/>} />
      </Routes>
      {/* </div> */}
    </>
  )
}

const Sorting2 = () => {
  return (
    <>
      <nav>
        <NavLink to="/sorting2/mergesort" className={({ isActive }) => (isActive ? 'active' : '')}>Merge Sort</NavLink>
        <NavLink to="/sorting2/countingsort" className={({ isActive }) => (isActive ? 'active' : '')}>counting Sort</NavLink>
        <NavLink to="/sorting2/shellsort" className={({ isActive }) => (isActive ? 'active' : '')}>Shell Sort</NavLink>
        <NavLink to="/sorting2/radixsort" className={({ isActive }) => (isActive ? 'active' : '')}>Radix Sort</NavLink>
      </nav>
      <Routes>
        <Route index element={<MergeSort/>}/>
        <Route path='/mergesort' element={<MergeSort/>} />
        <Route path='/countingsort' element={<CountingSort/>} />
        <Route path='/shellsort' element={"i am shell sort"} />
        <Route path='/radixsort' element={"i am radix sort"} />
      </Routes>
    </>
  )
}
const Queue=()=>{
  return(
    <>
    <nav>
        <NavLink to="/queue/createqueue" className={({ isActive }) => (isActive ? 'active' : '')}>Create</NavLink>
        <NavLink to="/queue/addqueue" className={({ isActive }) => (isActive ? 'active' : '')}>Add Element</NavLink>
        <NavLink to="/queue/removequeue" className={({ isActive }) => (isActive ? 'active' : '')}>Delete Element</NavLink>
        <NavLink to="/queue/getqueue" className={({ isActive }) => (isActive ? 'active' : '')}>Get ELement</NavLink>
        <NavLink to="/queue/sizequeue" className={({ isActive }) => (isActive ? 'active' : '')}>Get Size</NavLink>
      </nav>
      <Routes>
        <Route index element={"create"}/>
        <Route path='/createqueue' element={"create"} />
        <Route path='/addqueue' element={"push"} />
        <Route path='/removequeue' element={"pop"} />
        <Route path='/getqueue' element={"peek"} />
        <Route path='/sizequeue' element={"size"} />
      </Routes>
    </>
)}
const ShowPage = () => {
  return (
    <div className="show">
      <img src={ShowLogo} alt="" />
      <div id="intro">
      We simplify the complexities of Data Structures & Algorithms, providing you with powerful visual tools and clear guidance for effective learning.
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<><ShowPage/><hr /><MyPage/></>}/>
        <Route path='/sorting1/*' element={<Sorting1/>}/>
        <Route path='/sorting2/*' element={<Sorting2/>}/>
        <Route path='/queue/*' element={<Queue/>}/>
      </Routes>
    </Router>
  );
}

export default App;
