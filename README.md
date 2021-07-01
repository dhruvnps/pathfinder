# [Pathfinder](https://dhruvnps.github.io/pathfinder/)

Finding the shortest path in a maze

## Usage

- Draw the walls of the maze to be traversed
- Add 10x weights by selecting the *weight* button
- Select the pathfinding algorithm from the menu bar
- Watch the algorithm find a path

## Algorithms

### A Star

- Finds **shortest** path in a **weighted** maze
- Selects node minimising *f(n) = g(n) + h(n)*
- *g(n)* is the distance from start node
- *h(n)* is the heuristic function estimating distance to end node

### Dijkstra

- Finds **shortest** path in an **weighted** maze
- Selects node minimising *g(n)*
- *g(n)* is the distance from start node

### Best First Search

- Finds a path (not always shortest) in an **unweighted** maze
- Selects node minimising *h(n)*
- *h(n)* is the heuristic function estimating distance to end node


### Breadth First Search

- Finds **shortest** path in an **unweighted** maze
- Selects node minimising *g(n)*
- *g(n)* is the distance from start node
