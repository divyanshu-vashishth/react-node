import React, { useState } from 'react';
import { useReactFlow } from 'reactflow';
import { Button, Alert } from "@material-tailwind/react";

export const SubmitButton = () => {
    const { getNodes, getEdges } = useReactFlow();
    const [alertMessage, setAlertMessage] = useState({});
    const [alertType, setAlertType] = useState('info');
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async () => {
        const nodes = getNodes();
        const edges = getEdges();
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });
            const data = await response.json();
            setAlertMessage({
                numNodes: data.num_nodes,
                numEdges: data.num_edges,
                isDag: data.is_dag
            });
            setAlertType('success');
            setShowAlert(true);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setAlertMessage({ error: 'An error occurred while submitting the pipeline.' });
            setAlertType('error');
            setShowAlert(true);
        }
    };

    return (
        <div className="fixed bottom-5 flex flex-col items-center">
            {showAlert && (
                <Alert 
                    color={alertType} 
                    onClose={() => setShowAlert(false)}
                    className="mb-4 max-w-md text-left"
                >
                    <p className="font-bold mb-2">Pipeline Analysis:</p>
                    {alertMessage.error ? (
                        <p>{alertMessage.error}</p>
                    ) : (
                        <>
                            <p>Number of nodes: {alertMessage.numNodes}</p>
                            <p>Number of edges: {alertMessage.numEdges}</p>
                            <p>Is DAG: {alertMessage.isDag ? 'Yes' : 'No'}</p>
                        </>
                    )}
                </Alert>
            )}
            <Button 
                onClick={handleSubmit} 
                color="deep-purple"
                className="px-6 py-3 text-base font-medium"
            >
                Submit
            </Button>
        </div>
    );
};