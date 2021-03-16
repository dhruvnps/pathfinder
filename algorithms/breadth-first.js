class BreadthFirst {

    static break = false
    static timer = ms => new Promise(res => setTimeout(res, ms))

    static async bfs(start, graph, delay) {
        var queue = [start]
        var visited = { start: true }
        var path = {}

        while (queue.length > 0) {
            if (this.break) {
                this.break = false
                draw(graph)
                return;
            }
            await this.timer(delay)

            var node = queue.shift()
            if (node != start) block(node[0], node[1], SCAN)

            for (var idx = 0; idx < DELTAS.length; idx++) {
                var [dx, dy] = DELTAS[idx]
                var n = [node[0] + dx, node[1] + dy]

                if (0 <= n[0] && n[0] < SIZE_X &&
                    0 <= n[1] && n[1] < SIZE_Y) {
                    var type = graph[n[1]][n[0]]
                    if (!(n.toString() in visited)) {
                        path[n] = node
                        if (type == EMPTY) {
                            visited[n] = true
                            queue.push(n)
                        } else if (type == END) {
                            return [path, n]
                        }
                    }
                }
            }
        }
    }

    static async shortest(graph, delay = 5) {
        var start = [S.x, S.y]
        var ret = await this.bfs(start, graph, delay)
        if (ret) {
            var [path, node] = ret
            while (true) {
                await this.timer(delay * 2)
                var node = path[node]
                if (node[0] == start[0] && node[1] == start[1]) break
                block(node[0], node[1], PATH)
            }
        }
    }

    static breakRun() {
        this.break = true;
    }
}