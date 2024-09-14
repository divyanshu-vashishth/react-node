import { useState } from "react";
import { Select } from "@material-tailwind/react";
import { Option } from "@material-tailwind/react";
import { BaseNode } from "./baseNode";

export const SelectNode = ({ id, data }) => {
  const [selected, setSelected] = useState(data?.selected || "");

  const content = () => (
    <Select label="Select Option" value={selected} onChange={setSelected}>
      <Option value="option1">Option 1</Option>
      <Option value="option2">Option 2</Option>
      <Option value="option3">Option 3</Option>
    </Select>
  );

  return (
    <BaseNode
      id={id}
      type="Select"
      data={{ selected }}
      inputs={[]}
      outputs={[{ id: "output" }]}
      content={content}
    />
  );
};
