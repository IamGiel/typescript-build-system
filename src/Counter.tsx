import React, { useEffect, useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(renderCount + 1);
    console.log("Component has re-rendered");
  }, [count]);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <p>COUNT: {count}</p>
      <p>Render Count: {renderCount}</p>
    </>
  );
};
