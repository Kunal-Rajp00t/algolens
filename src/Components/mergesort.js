import React, { useRef } from 'react';
import { useEffect } from 'react';
import './styleClass.css';


const MergeSort = () => {
    const mainContRef = useRef(null);
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const dSec = new Set();
    const createBars = () => {
        mainContRef.current.innerText = "";
        for (let i = 9; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        updateBars();
    }
    const mSort = (array) => {
        const moves = [];
        mergesort(array, 0, array.length - 1, 0, moves);
        return moves;
    }
    function mergesort(arr, low, high, depth, moves) {
        if (low >= high) return;
        let mid = Math.floor(low + (high - low) / 2);
        moves.push({
            indices: [mid], type: "divide",
        });
        mergesort(arr, low, mid, depth + 1, moves);
        moves.push({
            indices: [mid + 1], type: "divide",
        });
        mergesort(arr, mid + 1, high, depth + 1, moves);

        merge(arr, low, mid, high, moves);
    }
    function merge(arr, low, mid, high, moves) {
        const temp = [];
        let i = low, j = mid + 1;
        while (i <= mid && j <= high) {
            moves.push({
                indices: [i, j], type: "comp"
            });
            if (arr[i] < arr[j]) {
                temp.push(arr[i++]);
                moves.push({ indices: [i], type: "take" });
            }
            else {
                moves.push({ indices: [j], type: "take" });
                temp.push(arr[j++]);
            }
        }
        while (i <= mid) {
            moves.push({ indices: [i], type: "take" });
            temp.push(arr[i++]);
        }
        while (j <= high) {
            moves.push({ indices: [j], type: "take" });
            temp.push(arr[j++]);
        }

        for (let x = 0; x < temp.length; x++) {
            moves.push({
                indices: [low + x], type: "back", value: temp[x]
            });
            arr[low + x] = temp[x];
        }
    }

    const sort = () => {
        const copy = [...array];
        const moves = mSort(copy);
        animate(moves);
    }

    const animate = (moves) => {
        if (moves.length === 0) {
            updateBars();
            dSec.clear();
            return
        }
        const move = moves.shift();
        const [a, b] = move.indices;
        if (move.type === "divide") {
            dSec.add(a); // Mark start of a divided section
        } else if (move.type === "back" && dSec.has(a)) {
            dSec.delete(a); // Remove margin when segment fully sorted
        }
        if (move.type === "back")
            array[a] = move.value;

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
                if (move.type === "divide" || dSec.has(i)) {
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
                    <h2>Merge Sort</h2>
                    <p className='complexity'>Time Complexity : O ( n log n )</p>
                    <p className='complexity'>Space Complexity : O ( n )  <i style={{ fontSize: "14px" }}> for temporary arrays.</i></p>
                    <p>Merge Sort is a divide-and-conquer algorithm that recursively divides an array into smaller subarrays, sorts each subarray, and then merges them back together in order. It begins by dividing the array into two halves repeatedly until each subarray contains only one element, which is inherently sorted. Then, these subarrays are merged back together, arranging each element in ascending order as it progresses. </p>

                    <p>During the process, the margin between bars visually indicates the division between subarrays. And green denotes a comparison between elements, while red highlights elements being placed in their correct positions.</p>

                    Merge Sort efficiently sorts large or partially ordered datasets with a worst-case time complexity of O(n log n). Its recursive divide-and-merge approach highlights stable sorting principles, making it valuable for educational use.
                </div>
                <pre id="code">
                    <code>
                        {`function mergesort(arr, low, high, depth, moves):
    if low >= high: return
    set mid = floor((low + high) / 2)

    call mergesort(array, low, mid, depth + 1, moves)
    call mergesort(array, mid + 1, high, depth + 1, moves)

    call merge(array, low, mid, high, moves) 

function merge(array, low, mid, high, moves):
    temp = []
    set i = low and j = mid + 1

    while i <= mid and j <= high:
        if arr[i] < arr[j]: temp.push(arr[i]) and i++
        else: temp.push(arr[j]) and j++

    while i <= mid: temp.push(arr[i]) and i++
    while j <= high: temp.push(arr[j]) and j++

    for x from 0 to temp.length - 1: arr[low + x] = temp[x]
`}
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

export default MergeSort
