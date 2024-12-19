import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import './styleClass.css';


const CountingSort = () => {
    const mainContRef = useRef(null);
    let array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 9) + 1);
    const [count,setCount]=useState(new Array(10).fill(0));
    console.log(array);

    const createBars = () => {
        mainContRef.current.innerText = "";
        array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 9) + 1);
        console.log(array);

        for (let i = 9; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        updateBars();
    }
    const mSort = (array) => {
        const moves = [];
        const output = [];
        let max = Math.max(...array);
        let min = Math.min(...array);
        const range = max - min + 1;
        let lcount = new Array(10).fill(0);
        for (let n of array){
                lcount[n]++;
        }setCount([...lcount]);
        //finding position
        for (let i = 1; i < count.length; i++){
            lcount[i] += lcount[i - 1];
            
        }setCount([...lcount]);

        for (let i = 0; i < array.length; i++) {
            output[--lcount[array[i] - min]] = array[i];
        }
        return moves;
    }

    const sort = () => {
        const copy = [...array];
        const moves= mSort(copy);
        animate(moves);
    }

    const animate = (moves) => {
        if (moves.length === 0) {
            updateBars();
            return
        }
        const move = moves.shift();
        const [a, b] = move.indices;

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
                if (move.type === "divide") {
                    bar.style.marginRight = '15px';
                    bar.style.marginLeft = '15px';
                    bar.style.backgroundColor = "rgb(66, 66, 66)"
                }
                else if (move.type === "back") bar.style.backgroundColor = "red"
                // else if (move.type === "take") bar.style.backgroundColor = "blue"
                else bar.style.backgroundColor = "green"
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
                    <h2>Counting Sort</h2>
                    <p className='complexity'>Time Complexity : O ( n + k )</p>
                    <p className='complexity'>Space Complexity : O ( k )
                        <i style={{ fontSize: "14px", marginLeft: "1rem" }}> where k is the range of elements in array</i>
                    </p>
                    <p>Counting Sort is a non-comparison-based sorting algorithm that works by counting the frequency of each element in the input array and using this count to place elements in their correct sorted positions. It efficiently handles datasets where the range of elements (k) is relatively small compared to the size of the array (n). </p>

                    <p>The algorithm involves three main steps: counting the occurrences of each element, calculating the cumulative count, and using the cumulative counts to place elements in the output array.It is a stable sort.</p>

                    Counting Sort is particularly effective for sorting integers or categorical data within a limited range. However, its performance is heavily dependent on the range of input values, as the space complexity grows with k.
                </div>
                <pre id="code">
                    <code>
                        {`set max = maximum element of array
set min = minimum element of array
set range = max - min + 1

position_array = [ range ] (iniialize with 0)
    
for ( i = 0; i < n; i++ ) position_array[arr[i]]++ 
    
for ( i = 1; i < n; i++ ) 
  position_array[i] += position_array[i-1]

for ( i = 0; i < n; i++)
  output [ position_array[ arr[i] - mid ] ]=arr[i]
  position_array [ arr[i] - mid ]--

    
`}
                    </code>
                </pre>
                <button onClick={createBars} >Create/Shuffle</button>
            </div>
            <div className="right">
                <div className="mainCont" ref={mainContRef}></div>
                <div className="array_sec"  >
                    {count.map((value,index)=>(<div className="cell">
                        <span className="number">{value}</span>
                        <span className="index">{index}</span>
                    </div>
                    ))}
                </div>
                <button onClick={sort}>Start Sorting</button>
            </div>
        </div>
    )
}

export default CountingSort