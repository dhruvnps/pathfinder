class AStar {

    constructor(heuristic) {
        this.heuristic = heuristic
    }

    shortest(graph) {
        var heap = new Heap((a, b) => a.f - b.f)

        var start = graph.start,
            end = graph.end

        start.g = 0
        start.f = this.heuristic(start, end)

        heap.push(start)
        start.open()

        while (!heap.empty()) {
            var node = heap.pop()
            node.close()

            if (node.equals(end)) return graph.backtrack(node)

            for (let neighbor of graph.neighbors(node)) {
                if (neighbor.closed) continue

                var ng = node.g + neighbor.weight

                if (!neighbor.opened || ng < neighbor.g) {
                    neighbor.g = ng
                    neighbor.f = ng + this.heuristic(neighbor, end)
                    neighbor.connected = node

                    if (!neighbor.opened) {
                        heap.push(neighbor)
                        neighbor.open()
                    } else {
                        heap.updateItem(neighbor)
                    }
                }
            }
        }
    }
}
