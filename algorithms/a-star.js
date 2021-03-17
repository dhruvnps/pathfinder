class AStar {

    static break = false
    static timer = ms => new Promise(res => setTimeout(res, ms))

    static async astar(start, end, graph) {
        this.break = false

        var fScore = { start: 0 },
            gScore = { start: 0 },
            visited = { start: true },
            heap = new Heap((a, b) => fScore[a] - fScore[b]),
            path = {}

        heap.push(start)
        gScore[start] = 0
        fScore[start] = Math.abs(start[0] - end[0])
            + Math.abs(start[1] - end[1])


        while (!heap.empty()) {
            var node = heap.pop()
            visited[node] = true;

            var type = graph[node[1]][node[0]]
            if (type == END) {
                return [path, node]
            } else if (node != start) {
                block(node[0], node[1], VISUAL.done)
            }

            for (var idx = 0; idx < DELTAS.length; idx++) {
                if (this.break) return
                await this.timer(DELAY.search)

                var [dx, dy] = DELTAS[idx],
                    n = [node[0] + dx, node[1] + dy]

                if (0 <= n[0] && n[0] < graph[0].length &&
                    0 <= n[1] && n[1] < graph.length) {
                    var type = graph[n[1]][n[0]]
                    if (!(n.toString() in visited) &&
                        type == EMPTY || type == END) {

                        var ng = gScore[node] + 1
                        if (!(n.toString() in gScore) ||
                            ng < gScore[n]) {
                            path[n] = node
                            gScore[n] = ng
                            fScore[n] = gScore[n]
                                + Math.abs(n[0] - end[0])
                                + Math.abs(n[1] - end[1])
                            if (!(n.toString() in heap)) {
                                heap.push(n)
                                if (type != END)
                                    block(n[0], n[1], VISUAL.edge)
                            }
                        }
                    }
                }
            }
        }
    }

    static breakRun() {
        this.break = true
    }

    static async shortest(graph, start_x, start_y, end_x, end_y) {
        await this.timer(Math.max(DELAY.search, DELAY.path))
        var ret = await this.astar(
            [start_x, start_y], [end_x, end_y], graph
        )
        if (ret) {
            var [path, node] = ret
            while (!this.break) {
                await this.timer(DELAY.path)
                var node = path[node]
                if (node[0] == start_x && node[1] == start_y) return
                block(node[0], node[1], VISUAL.path)
            }
        } draw(graph)
    }
}
