import React, { useRef } from 'react';
import { useEffect } from 'react';
import './styleClass.css';


const Bubblesort = () => {
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
  const bSort = (array) => {
    const moves = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10 - i - 1; j++) {
        moves.push({
          indices: [j, j + 1], type: "comp"
        });
        if (array[j] > array[j + 1]) {
          moves.push({
            indices: [j, j + 1], type: "swap"
          });
          [array[j + 1], array[j]] = [array[j], array[j + 1]];
        }
      }
    }
    return moves;
  }

  const sort = () => {
    const copy = [...array];
    const moves = bSort(copy);
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
        bar.style.backgroundColor = move.type === "swap" ? "red" : "green";
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
          <h2>Bubble Sort</h2>
          <p className='complexity'>Time Complexity : O ( n{"\u00B2"} )</p>
          <p className='complexity'>Space Complexity : O ( 1 )</p>
          <p>Bubble Sort is a simple sorting algorithm that repeatedly steps through a list, comparing each pair of adjacent items. If two items are out of order, it swaps them. This process continues from the start of the list to the end, with larger elements "bubbling up" to their correct positions. </p>
          However, Bubble Sort works well for small or nearly sorted lists. With a small optimization—stopping early if no swaps are made in a pass—it can perform better on lists that are mostly sorted. This makes it a helpful tool for learning the basics of sorting.       
        </div>
          <pre id="code">
            <code>
              {`for i from 0 to n - 1 do:
  for j from 0 to n - i - 1 do:
    if array[j] > array[j+1] then:
    Swap (array[j] and array[j+1])`}
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

export default Bubblesort
