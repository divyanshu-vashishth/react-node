
#### I have used virtual environment in fastapi backend


### In chromium based browser when I am using number node and increasing, decreasing through symbol (^) It is not increasing and decreasing automaticaly.When I am using mozilla based browser it is working fine. 

### After creating one edge between any two nodes in chrome visibility of cursor is getting worse. I have tried same on mozilla browser it is working fine. I have tried some methods like giving cursor styles to different components but it is not working. So I change the background color grayis of pipeline ui. 

#### We can also use this python code to parse that pipeline it uses networkx library to create a directed graph and then checks if the graph is a DAG ## or not. 

### In backend
```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import networkx as nx

app = FastAPI()

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: Pipeline):
    try:
        # Create a directed graph
        G = nx.DiGraph()

        # Add nodes and edges to the graph
        for node in pipeline.nodes:
            G.add_node(node.id)
        for edge in pipeline.edges:
            G.add_edge(edge.source, edge.target)

        # Calculate the number of nodes and edges
        num_nodes = G.number_of_nodes()
        num_edges = G.number_of_edges()

        # Check if the graph is a DAG
        is_dag = nx.is_directed_acyclic_graph(G)

        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}
```