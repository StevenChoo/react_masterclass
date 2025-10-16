import { useState } from "react";
import "./App.css";

function SlowComponent(props: { unused?: any }) {
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

function DemoComponent() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#ffffff");

  return (
    <div className={`flex gap-8`}>
      <div className="flex flex-col p-4 border border-white h-64 w-96 gap-4">
        <h2 className="text-xl font-bold mb-8 text-center">Color Picker</h2>
        <ColorPicker value={color} onChange={(e) => setColor(e)} />
        <div className="mt-2">
          Current value: <br />
          <span className="font-mono">{color}</span>
        </div>
      </div>
      <div className="flex flex-col p-4 border border-white h-64 w-96 gap-4">
        <h2 className="text-xl font-bold mb-8 text-center">Counter</h2>
        <CounterButton onClick={() => setCount((count) => count + 1)} />
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
        <SlowComponent unused={{ name: "nope" }} />
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
