class Graph {

    constructor(width, height, start, end) {
        this.width = width
        this.height = height

        this.graph =
            Array(height).fill()
                .map((_, y) => Array(width).fill()
                    .map((_, x) => new Node(x, y)))

        this.start = start
        this.end = end
        this.insert(start)
        this.insert(end)
    }

    insert(node) {
        this.graph[node.y][node.x] = node
    }

    getNode(x, y) {
        if (this.exists(x, y)) return this.graph[y][x]
    }

    exists(x, y) {
        return 0 <= x && x < this.width
            && 0 <= y && y < this.height
    }

    backtrack(node) {
        var path = [node]
        while (!node.equals(this.start)) {
            node = node.connected
            path.push(node)
        }
        return path.reverse()
    }

    neighbors(node) {
        var deltas = [[0, 1], [1, 0], [0, -1], [-1, 0]]

        var neighbors = []
        deltas.forEach(([dx, dy]) => {
            var neighbor = this.getNode(node.x + dx, node.y + dy)
            if (neighbor && !neighbor.wall)
                neighbors.push(neighbor)
        })
        return neighbors
    }

    reset() {
        this.graph.forEach(row =>
            row.forEach(node =>
                node.reset()))
    }

}