import { useState } from "react";
import { Checkbox } from "@material-tailwind/react";
import { BaseNode } from "./baseNode";

export const BooleanNode = ({ id, data }) => {
  const [isChecked, setIsChecked] = useState(data?.isChecked || false);

  const content = () => (
    <div className="flex items-center">
      <Checkbox
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <span className="ml-2">Boolean Value</span>
    </div>
  );

  return (
    <BaseNode
      id={id}
      type="Boolean"
      data={{ isChecked }}
      inputs={[]}
      outputs={[{ id: "output" }]}
      content={content}
    />
  );
};
