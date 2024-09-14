import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BaseNode } from './baseNode';
import { Handle, Position, updateEdge, useUpdateNodeInternals } from 'reactflow';
import { Textarea } from "@material-tailwind/react";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const parseVariables = useCallback((text) => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = [...new Set(text.match(regex) || [])];
    return matches.map(match => match.slice(2, -2));
  }, []);

  useEffect(() => {
    const newVariables = parseVariables(text);
    setVariables(newVariables);

    //  textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    // console.log('node update   ', { id, text, variables });
    updateNodeInternals(id);
    
  }, [text, parseVariables,id]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    // Adjust textarea height immediately on input
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const content = () => (
    <div className="w-full h-full">
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="{{variables}} Enter text"
        className="w-full min-h-[100px] resize-none"
      />
    </div>
  );

  return (
    <div style={{ width: '100%', height: 'auto', minHeight: '100px' }}>
      <BaseNode
        id={id}
        type="Text"
        data={{ text }}
        inputs={[]}
        outputs={[{ id: 'output' }]}
        content={content}
      />
      {variables.map((variable, index) => (
        <Handle
          key={`var-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: `${(index + 1) * 100 / (variables.length + 1)}%` }}
        />
      ))}
    </div>
  );
};