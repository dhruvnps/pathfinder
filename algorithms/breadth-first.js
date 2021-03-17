class BreadthFirst {

    static break = false
    static timer = ms => new Promise(res => setTimeout(res, ms))

    static async bfs(start, graph) {
        this.break = false

        var queue = [start],
            visited = { start: true },
            path = {}

        while (queue.length > 0) {
            var node = queue.shift()
            if (node != start) block(node[0], node[1], VISUAL.done)

            for (var idx = 0; idx < DELTAS.length; idx++) {
                if (this.break) return
                await this.timer(DELAY.search)

                var [dx, dy] = DELTAS[idx],
                    n = [node[0] + dx, node[1] + dy]

                if (0 <= n[0] && n[0] < graph[0].length &&
                    0 <= n[1] && n[1] < graph.length) {
                    var type = graph[n[1]][n[0]]
                    if (!(n.toString() in visited)) {

                        path[n] = node

                        if (type == EMPTY) {
                            visited[n] = true
                            queue.push(n)
                            block(n[0], n[1], VISUAL.edge)

                        } else if (type == END) {
                            return [path, n]
                        }
                    }
                }
            }
        }
    }

    static breakRun() {
        this.break = true
    }

    static async shortest(graph, start_x, start_y) {
        await this.timer(Math.max(DELAY.search, DELAY.path))
        var ret = await this.bfs([start_x, start_y], graph)
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
