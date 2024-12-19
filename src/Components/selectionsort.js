import React, { useRef } from 'react';
import { useEffect } from 'react';
import './styleClass.css'


const Selectionsort = () => {
  const mainContRef = useRef(null);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const createBars = () => {
    mainContRef.current.innerText = "";
    for (let i = 9; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    updateBars();
  }
  const sSort = (array) => {
    const moves = [];
    for (let i = 0; i < 10; i++) {
      let minIdx = i;
      let j = i + 1;

      while (j < 10) {
        moves.push({
          indices: [i, j], type: "comp"
        });
        if (array[j] < array[minIdx]) minIdx = j;
        j++;

      }
      //swap
      if (minIdx !== i) {
        moves.push({
          indices: [i, minIdx], type: "swap"
        });
        [array[minIdx], array[i]] = [array[i], array[minIdx]];
      }
    }
    return moves;
  }

  const sort = () => {
    const copy = [...array];
    const moves = sSort(copy);
    animate(moves);
  }

  const animate = (moves) => {
    if (moves.length === 0) {
      updateBars();
      return
    }
    const move = moves.shift();
    const [a, b] = move.indices;
    if (move.type === "swap")
      [array[a], array[b]] = [array[b], array[a]];
    updateBars(move);
    setTimeout(() => {
      animate(moves);
    }, 600)
  }

  const updateBars = (move) => {
    if (mainContRef.current === null) return;
    mainContRef.current.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
      let bar = document.createElement("div");
      let curH = (array[i] * 10);
      bar.style.height = curH + "%";
      bar.innerText = array[i];
      bar.classList.add("bar");
      if (move && move.indices.includes(i)) {
        bar.style.backgroundColor = move.type === "comp" ? "green" : "red";
      }
      mainContRef.current.appendChild(bar);
    }
  }
  useEffect(() => {
    createBars();
  }, [])


  return (
    <div className='sort'>
      <div className="left">
        <div className="details">
          <h2>Selection Sort</h2>
          <p className='complexity'>Time Complexity : O ( n{"\u00B2"} )</p>
          <p className='complexity'>Space Complexity : O ( 1 )</p>
          <p>Selection Sort is a straightforward sorting algorithm that divides a list into a sorted and an unsorted part. It repeatedly steps through the unsorted part to find the smallest element, then swaps it with the first unsorted element. This way, the smallest element is "selected" and placed in its correct position with each pass.</p>
          Selection Sort's simplicity makes it easy to understand and implement, though it's generally not efficient for large lists. It performs the same number of comparisons regardless of whether the list is already sorted, which can make it slower than other algorithms for larger or nearly sorted lists. However, Selection Sort's predictable structure and low memory usage make it a good tool for understanding the basics of sorting.
        </div>
        <pre id="code">
          <code>
            {`for i from 0 to n - 1 do:
 set minIdx = i
 set j = i + 1

   while j < n do:
     if array[j] < array[minIdx] then:
     minIdx = j 
    
 if minIdx != i
 swap ( array[minIdx] , array[i] )`}
          </code>
        </pre>
        <button onClick={createBars} >Create/Shuffle</button>
      </div>
      <div className="right">
        <div className="mainCont" ref={mainContRef}></div>
        <button onClick={sort}>Start Sorting</button>
      </div>
    </div>
  )
}

export default Selectionsort
