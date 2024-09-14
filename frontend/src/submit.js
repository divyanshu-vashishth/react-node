import React from 'react';
import { useReactFlow } from 'reactflow';
import { Button } from "@material-tailwind/react";

export const SubmitButton = () => {
    const { getNodes, getEdges } = useReactFlow();

    const handleSubmit = async () => {
        const nodes = getNodes();
        const edges = getEdges();

        try {
            const response = await fetch('/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();

            alert(`Pipeline Analysis:
                Number of nodes: ${data.num_nodes}
                Number of edges: ${data.num_edges}
                Is DAG: ${data.is_dag ? 'Yes' : 'No'}`);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('An error occurred while submitting the pipeline.');
        }
    };

    return (
        <div className="flex items-center justify-center mt-4">
            <Button onClick={handleSubmit} color="deep-purple">
                Submit
            </Button>
        </div>
    );
};