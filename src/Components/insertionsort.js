import React, { useRef } from 'react';
import { useEffect } from 'react';
import './styleClass.css';


const InsertionSort = () => {
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
    const iSort = (array) => {
        const moves = [];
        for (let i = 1; i < 10; i++) {
            let key = array[i]
            let j = i - 1;
            while (j >= 0 && array[j] > key) {
                moves.push({
                    indices: [j+1, j], type: "comp"
                });
                moves.push({
                    indices: [j+1, j], type: "swap"
                });
                array[j + 1] = array[j];
                j--;
            }
            moves.push({
                indices: [-1, j + 1], type: "insert"
            });
            array[j + 1] = key;
        }
        return moves;
    }

    const sort = () => {
        const copy = [...array];
        const moves = iSort(copy);
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
                if(move.type === "swap")bar.style.backgroundColor = "red"
                else if(move.type === "insert")bar.style.backgroundColor="orange";
                else bar.style.backgroundColor="green"
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
                    <h2>Insertion Sort</h2>
                    <p className='complexity'>Time Complexity : O ( n{"\u00B2"} )</p>
                    <p className='complexity'>Space Complexity : O ( 1 )</p>
                    <p>Insertion Sort is an algorithm that builds the sorted list one element at a time by repeatedly taking the next unsorted element and inserting it into its correct position in the already sorted part of the list. Starting from the second element, each element is compared to those before it and shifted left until it reaches a spot where it is larger than the previous element but smaller than the next.</p>

                    Insertion Sort is particularly efficient for small lists or lists that are already mostly sorted, making it ideal for educational purposes and small data sets. This step-by-step insertion process demonstrates the basics of sorting and provides a good foundation for understanding more advanced algorithms.
                </div>
                <pre id="code">
                    <code>
                        {`for i from 1 to n - 1 do:
  set key = array[i]
  set j = i-1

   while j >= 0 and array[j] > key do:
    array[j+1] = array[j] (shift element)
    decrement j 

  array[j+1] = key (set key at it's correct position)`}
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

export default InsertionSort
