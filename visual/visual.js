class Visual {

    static init() {
        this.callstack = []
        this.timeouts = []

        var start = new Node(5, 10)
        var end = new Node(24, 10)
        this.graph = new Graph(30, 20, start, end)

        this.grid = new Grid(this.graph, 30)

        this.run()
    }

    static run() {
        var finder = new AStar(Heuristic.manhattan)
        this.graph.reset()
        this.path(finder.shortest(this.graph))
        this.runstack()
    }

    static draw(x, y, erase, weight = 1) {
        this.stop()
        this.graph.insert(erase
            ? new Node(x, y, weight)
            : new Wall(x, y))
        this.grid.reset()
    }

    static path(nodes) {
        if (!nodes) return
        for (let node of nodes.slice(1, -1)) {
            this.callstack.push(() => this.grid.path(node))
        }
    }

    static open(node) {
        this.callstack.push(() => this.grid.open(node))
    }

    static close(node) {
        this.callstack.push(() => this.grid.close(node))
    }

    static runstack() {
        this.callstack.forEach(function (action, idx) {
            Visual.timeouts.push(setTimeout(action, 10 * idx))
        })
        this.callstack.length = 0
    }

    static stop() {
        for (let timeout of this.timeouts) clearTimeout(timeout)
        this.timeouts.length = 0
    }

}