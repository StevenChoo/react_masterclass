# Demo notes

Talk from: https://www.youtube.com/watch?v=INLq9RPAYUw

## General

By default disabled react-compiler in vite.config.ts

## Steps

### 1. Setup project

```shell
npm install
npm run dev
```

### 2. Show problem

Problems are:

# Components are re-rendered every time a color has changed
## Due to prop passing to component
## Passing function to component

## Goal is to have rerenderds besides the color component 0
# Note that react-compiler works to
# Remove slowComponent works to


```markdown
# This component does heavy computation
function SlowComponent(props: { unused?: any }) {

# This component is rerenderd but does not have to since nothing changed
function CounterButton(props: { onClick: () => void }) {

# This component is rerenderd but does not have to since nothing changed
function ColorPicker(props: {

## All need to be meoized

# This functions makes it that the due to the coupling of the function to the component, the component rerenders
() => setCount((count) => count + 1)

## Note
# Doing: const userCounterClick = useEffect(() => setCount((count) => count + 1)) without array will cause:
## Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
##
## This is due to updating state causes new effect -> after rerender -> set state is ran again, and again and again
##
##   const userCounterClick = useEffect(() => setCount((count) => count + 1), [color]) // Wont endless loop due to dependency on Color
```

```jsx
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import React from "react";

function RealSlowComponent(props: { unused?: any }) {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  return (
    <div className="flex flex-wrap overflow-scroll gap-1">
      {largeArray.map((value) => (
        <div
          key={value}
          className="w-2 h-2 bg-neutral-700"
          style={{
            backgroundColor: `rgb(${value % 255}, ${(value * 2) % 255}, ${(value * 3) % 255})`,
          }}
        ></div>
      ))}
    </div>
  );
}

const SlowComponent = React.memo(RealSlowComponent)

function CounterButton(props: { onClick: () => void }) {
  return (
    <button
      onClick={props.onClick}
      className="px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600 border border-white/20"
    >
      Increase count
    </button>
  );
}

const MemoCounterButton = React.memo(CounterButton) // Memo Counter button

function ColorPicker(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="color"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className="w-full h-12 cursor-pointer rounded border border-white/20 bg-neutral-700 p-1"
    />
  );
}

const MemoColorPicker = React.memo(ColorPicker) // Memo Color Picker

// React by default always assumed something is changed. Choice is not to bother
function DemoComponent() {
  const [count, setCount] = useState(0); // Because state is passed. If count is changed all other components needs to be checked.
  const [color, setColor] = useState("#ffffff"); // Color picker -> color is changed so rerender of component

  const userCounterClick = useCallback(() => setCount((count) => count + 1), []) // Errornouse since it has no error
  // 

  return (
    <div className={`flex gap-8`}>
      <div className="flex flex-col p-4 border border-white h-64 w-96 gap-4">
        <h2 className="text-xl font-bold mb-8 text-center">Color Picker</h2>
        <MemoColorPicker value={color} onChange={(e) => setColor(e)} />
        <div className="mt-2">
          Current value: <br />
          <span className="font-mono">{color}</span>
        </div>
      </div>
      <div className="flex flex-col p-4 border border-white h-64 w-96 gap-4">
        <h2 className="text-xl font-bold mb-8 text-center">Counter</h2>
        <MemoCounterButton onClick={ userCounterClick } />
        <div className="mt-2">
          Current value: <br />
          <span className="font-mono">{count}</span>
        </div>
      </div>
      <div className="flex flex-col p-4 border border-white h-64 w-96 gap-2">
        <h2 className="text-xl font-bold text-center">A Slow Component</h2>
        <span className="text-center text-neutral-200 font-light">
          (This component renders 10,000 boxes)
        </span>
        <SlowComponent  />
        {/* <RealSlowComponent unused={{ name: "nope" }} /> */}
      </div>
    </div>
  );
}

function ParentComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold text-center py-8 absolute top-0 left-0 right-0">
        React Compiler Demo
      </h1>
      <div className={`flex items-center justify-center flex-grow`}>
        <DemoComponent />
      </div>
    </div>
  );
}

export default ParentComponent;
```
