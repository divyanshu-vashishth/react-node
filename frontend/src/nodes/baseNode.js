import React from "react";
import { Handle, Position } from "reactflow";
import { Card, CardBody, Typography } from "@material-tailwind/react";

export const BaseNode = ({ id, type, inputs, outputs, content ,data }) => {
  return (
    <Card className="w-64" style={{ height: 'auto' }}>
      <CardBody className="p-4">
        {inputs.map((input, index) => (
          <Handle
            key={`input-${index}`}
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            className={`w-2 h-2`}
            style={{ top: `${((index + 1) * 100) / (inputs.length + 1)}%` }}
          />
        ))}
        <Typography variant="h6" color="deep-purple" className="mb-2">
          {type}
        </Typography>
        <div>{content(data)}</div>
        {outputs.map((output, index) => (
          <Handle
            key={`output-${index}`}
            type="source"
            position={Position.Right}
            id={`${id}-${output.id}`}
            className={`w-2 h-2`}
            style={{ top: `${((index + 1) * 100) / (outputs.length + 1)}%` }}
          />
        ))}
      </CardBody>
    </Card>
  );
};