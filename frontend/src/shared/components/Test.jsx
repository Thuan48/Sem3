import { useState } from "react";

export default function Test() {
  const [value, setValue] = useState(1);

  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue((value) => value + 1)}>click</button>
    </div>
  );
}
