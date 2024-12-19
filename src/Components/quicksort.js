import React, { useRef } from 'react';
import { useEffect } from 'react';
import './styleClass.css';


const QuickSort = () => {
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
    const qSort = (array) => {
        const moves = [];
        qsortfunc(array, 0, 9, moves);
        return moves
    }

    function qsortfunc(array, low, high, moves) {
        if (low >= high) return;
        let pi = partition(low, high, array, moves);
        qsortfunc(array, low, pi - 1, moves);
        qsortfunc(array, pi + 1, high, moves);
    }

    function partition(low, high, array, moves) {
        let pivot = array[low];
        moves.push({
            indices: [-1, low], type: "pivot"
        });
        let j = low + 1, k = high;
        while (j <= k) {
            while (j < 10 && array[j] <= pivot) {
                moves.push({
                    indices: [j, -1], type: "finding"
                });
                j++;
            }
            while (k >= low && array[k] > pivot) {
                moves.push({
                    indices: [k, -1], type: "finding"
                });
                k--;
            }
            moves.push({
                indices: [j, k], type: "comp"
            });
            if (j < k) {
                moves.push({
                    indices: [j, k], type: "swap"
                });
                [array[j], array[k]] = [array[k], array[j]];
            }
        }
        moves.push({
            indices: [k, low], type: "swap"
        });
        [array[k], array[low]] = [array[low], array[k]];
        return k;
    }

    const sort = () => {
        const copy = [...array];
        const moves = qSort(copy);
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
        }, 800)
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
                if (move.type === "swap") bar.style.backgroundColor = "red"
                else if (move.type === "insert") bar.style.backgroundColor = "orange";
                else if (move.type === "finding") bar.style.backgroundColor = "purple"
                else if (move.type === "pivot") bar.style.backgroundColor = "gold"
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
                    <h2>Quick Sort</h2>
                    <p className='complexity'>Time Complexity : O ( n{"\u00B2"} )</p>
                    <p className='complexity'>Space Complexity : O ( log n ) <i style={{ fontSize: "14px" }}>due to recursion stack</i></p>
                    <p>Quick Sort is a divide-and-conquer algorithm that efficiently sorts a list by selecting a "pivot" element ( highlighed with yellow ) and dividing the number smaller than pivot left side and greater to the right. This process is recursively applied to each sub-array until the entire list is sorted.</p>

                    Quick Sort is particularly effective for large datasets because it minimizes the number of comparisons and swaps. Its <b>average-case time complexity is O ( n log n )</b> , making it faster than many other algorithms for random or unsorted data. This systematic partitioning provides insights into sorting principles and recursion, making it both efficient and educational for understanding fundamental sorting mechanics.
                </div>
                <pre id="code">
                    <code>
                        {`function quickSort(low ,high ,array):
  if(low >= high)return

  set partitionIndex=findPartition(low ,high ,array)

  quickSort(low ,partitionIndex - 1 ,array)
  quickSort(partitionIndex + 1 ,high ,array)
                        
function findPartition(low ,high ,array):
  set pivot = array[low]
  set i = low + 1 and j = high

  while i <= j:
    while i < length and array[i] <= pivot : increment i
    while j >= low and array[j] > pivot : decrement j

    if i < j then: 
    swap (array[i] and array[j])

 swap(array[j] and array[low])    
 return j `}
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

export default QuickSort
