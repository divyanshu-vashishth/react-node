import React, { useState, useEffect } from 'react';
import { Typography, Input, Select, Option } from "@material-tailwind/react";
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  useEffect(() => {
    data.outputName = currName;
    data.outputType = outputType;
    // console.log('OutputNode data:', data);
  }, [currName, outputType, data]);

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
        value={outputType}
        onChange={(value) => setOutputType(value)}
      >
        <Option value="Text">Text</Option>
        <Option value="File">Image</Option>
      </Select>
    </div>
  );

  return (
    <div style={{ width: '256px' }}>
      <BaseNode
        id={id}
        type="Output"
        data={{ outputName: currName, outputType }}
        inputs={[{ id: 'value' }]}
        outputs={[]}
        content={content}
      />
    </div>
  );
};