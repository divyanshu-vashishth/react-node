// toolbar.js

import { DraggableNode } from './draggableNode';
import { Card,CardBody, CardHeader , Navbar, Typography} from '@material-tailwind/react';
export const PipelineToolbar = () => {

    return (
        <Card className='max-w-4xl bg-opacity-0 shadow-none border-none mt-2'>
         <CardBody className="flex flex-wrap p-4 "> 
          <DraggableNode type='customInput' label='Input' />
          <DraggableNode type='llm' label='LLM' />
          <DraggableNode type='customOutput' label='Output' />
          <DraggableNode type='text' label='Text' />
          <DraggableNode type='number' label='Number' />
          <DraggableNode type='boolean' label='Boolean' />
          <DraggableNode type='date' label='Date' />
          <DraggableNode type='select' label='Select' />
          <DraggableNode type='color' label='Color' />
      </CardBody>
    </Card> 
    );
};
