import React, { useState, useEffect } from 'react';
import { Typography, Input, Select, Option } from "@material-tailwind/react";
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  useEffect(() => {
    data.inputName = currName;
    data.inputType = inputType;
  }, [currName, inputType, data]);

  const content = () => (
    <div className="p-4 space-y-4">
      <Input
        size="md"
        label="Name"
        value={currName}
        onChange={(e) => setCurrName(e.target.value)}
      />
      <Select
        size="md"
        label="Type"
        value={inputType}
        onChange={(value) => setInputType(value)}
      >
        <Option value="Text">Text</Option>
        <Option value="File">File</Option>
      </Select>
    </div>
  );

  return (
    <div style={{ width: '256px' }}>
      <BaseNode
        id={id}
        type="Input"
        data={{ inputName: currName, inputType }}
        inputs={[]}
        outputs={[{ id: 'value' }]}
        content={content}
      />
    </div>
  );
};