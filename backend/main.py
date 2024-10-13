from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Set
from fastapi.middleware.cors import CORSMiddleware
# from pickle import pickle
# from torch import torch
# from numpy import numpy as np






app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://react-node-beryl.vercel.app/"], # not for productions
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionInput(BaseModel):
    features: List[float]

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class Graph:
    def __init__(self):
        self.nodes: Set[str] = set()
        self.edges: Dict[str, Set[str]] = {}

    def add_node(self, node: str):
        self.nodes.add(node)
        if node not in self.edges:
            self.edges[node] = set()

    def add_edge(self, source: str, target: str):
        self.add_node(source)
        self.add_node(target)
        self.edges[source].add(target)

    def is_dag(self) -> bool:
        visited = set()
        stack = set()

        def has_cycle(node: str) -> bool:
            if node in stack:
                return True
            if node in visited:
                return False
            visited.add(node)
            stack.add(node)
            for neighbor in self.edges[node]:
                if has_cycle(neighbor):
                    return True
            stack.remove(node)
            return False

        for node in self.nodes:
            if node not in visited:
                if has_cycle(node):
                    return False
        return True

        
@app.get('/')
def read_root():
    return {'Ping': 'Pong'}



@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: Pipeline):
    try:
        G = Graph()
        
        for node in pipeline.nodes:
            G.add_node(node.id)
        for edge in pipeline.edges:
            G.add_edge(edge.source, edge.target)

        num_nodes = len(G.nodes)
        num_edges = sum(len(edges) for edges in G.edges.values())
        is_dag = G.is_dag()

        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# @app.post('/predict')
# async def predict(input_data: PredictionInput):
#     try:
#         # Load the model lazily
#         with open('data/churn_model.pkl', 'rb') as f:
#             model = pickle.load(f)
        
#         # Convert input features into a numpy array
#         input_array = np.array(input_data.features).reshape(1, -1)
        
#         # Make a prediction
#         prediction = model.predict(input_array)
        
#         # Return the prediction result
#         return {
#             "prediction": prediction.tolist()  # Convert prediction to list to make it JSON serializable
#         }
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
