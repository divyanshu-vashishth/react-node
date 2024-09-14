import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { BaseNode } from "./baseNode";

export const NumberNode = ({ id, data }) => {
  const [number, setNumber] = useState(data?.number || 0);

  const content = () => (
    <Input
      type="number"
      label="Number"
      value={number}
      onChange={(e) => setNumber(Number(e.target.value))}
    />
  );

  return (
    <BaseNode
      id={id}
      type="Number"
      data={{ number }}
      inputs={[]}
      outputs={[{ id: "output" }]}
      content={content}
    />
  );
};
