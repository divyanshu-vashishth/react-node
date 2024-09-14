import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { BaseNode } from "./baseNode";

export const ColorNode = ({ id, data }) => {
  const [color, setColor] = useState(data?.color || "#000000");

  const content = () => (
    <Input
      type="color"
      label="Color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
    />
  );

  return (
    <BaseNode
      id={id}
      type="Color"
      data={{ color }}
      inputs={[]}
      outputs={[{ id: "output" }]}
      content={content}
    />
  );
};
