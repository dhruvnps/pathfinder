class Visual {

    static init(parent) {
        this.callstack = []
        this.timeouts = []

        var unit = 40

        var box = parent.node().getBoundingClientRect(),
            height = Math.ceil(box.height / unit),
            width = Math.ceil(box.width / unit),
            mid = {
                x: Math.ceil(width / 4) - 1,
                y: Math.ceil(height / 2) - 1
            }

        this.graph = new Graph(
            width,
            height,
            new Node(mid.x, mid.y),
            new Node(width - mid.x - 1, mid.y),
        )

        this.grid = new Grid(this.graph, unit, parent)

        this.run()
    }

    static run() {
        var finder = new AStar(Heuristic.manhattan)
        this.graph.reset()
        this.path(finder.path(this.graph))
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