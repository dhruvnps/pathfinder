class BreadthFirst {

    path(graph) {
        var start = graph.start,
            end = graph.end

        var queue = [start]
        start.open()

        while (queue.length > 0) {
            var node = queue.shift()
            node.close()

            for (let neighbor of graph.neighbors(node)) {
                if (neighbor.opened) continue

                neighbor.connected = node
                neighbor.open()
                queue.push(neighbor)

                if (neighbor.equals(end))
                    return graph.backtrack(neighbor)
            }
        }
    }
}