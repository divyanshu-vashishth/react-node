import React from 'react';
import { Typography } from "@material-tailwind/react";
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  const content = () => (
    <div className="p-4">
      <Typography variant="small" className="font-normal">
        This is a LLM.
      </Typography>
    </div>
  );

  return (
    <div style={{ width: '256px' }}>
      <BaseNode
        id={id}
        type="LLM"
        data={data}
        inputs={[
          { id: 'system', label: 'System' },
          { id: 'prompt', label: 'Prompt' }
        ]}
        outputs={[{ id: 'response', label: 'Response' }]}
        content={content}
      />
    </div>
  );
};