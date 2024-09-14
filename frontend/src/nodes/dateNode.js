import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { BaseNode } from "./baseNode";

export const DateNode = ({ id, data }) => {
  const [date, setDate] = useState(data?.date || "");

  const content = () => (
    <Input
      type="date"
      label="Date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  );

  return (
    <BaseNode
      id={id}
      type="Date"
      data={{ date }}
      inputs={[]}
      outputs={[{ id: "output" }]}
      content={content}
    />
  );
};
