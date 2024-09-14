import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { ReactFlowProvider } from "reactflow";
import { Typography, Navbar } from "@material-tailwind/react";


function App() {
  return (
    <>
      <Navbar className="sticky flex cursor-default top-2 mx-auto w-full max-w-screen-xl">
        <Typography
          className="flex  items-center justify-between text-black text-2xl font-serif"
        >
          <a  
          href="#"
          type="lead">
          Pipeline Editor
          </a>
        </Typography>
      </Navbar>
      <div className="w-screen ">
        <ReactFlowProvider>
          <PipelineToolbar />
          <PipelineUI />
          <div className="flex items-center justify-center">
            <SubmitButton />
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
}

export default App;
