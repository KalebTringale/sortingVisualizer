import React from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import "./SortingVisualizer.css";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.

const NUMBER_OF_ARRAY_BARS = window.innerWidth / 6;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {}

  heapSort() {}

  bubbleSort() {}

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        ></link>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
        <br></br>

        <ul>
          <li>
            <button
              class="waves-effect waves-light btn"
              onClick={() => this.resetArray()}
            >
              Generate New Array
            </button>
          </li>
          &nbsp;
          <li>
            <button
              class="waves-effect waves-light btn"
              onClick={() => this.mergeSort()}
            >
              Merge Sort
            </button>
          </li>
          &nbsp;
          <li>
            <button
              class="waves-effect waves-light btn"
              onClick={() => this.quickSort()}
            >
              Quick Sort
            </button>
          </li>
          &nbsp;
          <li>
            <button
              class="waves-effect waves-light btn"
              onClick={() => this.heapSort()}
            >
              Heap Sort
            </button>
          </li>
          &nbsp;
          <li>
            <button
              class="waves-effect waves-light btn"
              onClick={() => this.bubbleSort()}
            >
              Bubble Sort
            </button>
          </li>
        </ul>
        <input
          class="slide"
          id="typeinp"
          type="range"
          min="10"
          max="350"
          defaultValue="300"
          step="1"
        />
      </div>
    );
  }
}

console.log(document.getElementsByClassName("slide").value);

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
