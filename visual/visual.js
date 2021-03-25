class Visual {

    static init(container) {
        var unit = 40

        this.callstack = []
        this.timeouts = []

        var box = container.node().getBoundingClientRect(),
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

        this.grid = new Grid(this.graph, unit, container)
        this.find(new AStar(Heuristic.manhattan))
    }

    static set weight(value) {
        this.grid.weight = value
    }

    static get weight() {
        return this.grid.weight
    }

    static find(finder) {
        this.finder = finder
        this.grid.weighted = finder.weighted
        this.run()
    }

    static run() {
        this.stop()
        this.path(this.finder.path(this.graph))
        this.runstack()
    }

    static draw(node, erase, weight = 1) {
        this.graph.insert(erase
            ? new Node(node.x, node.y)
            : weight > 1
                ? new Node(node.x, node.y, weight)
                : new Wall(node.x, node.y))
        this.stop()
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
        this.graph.reset()
        this.grid.reset()
        for (let timeout of this.timeouts) clearTimeout(timeout)
        this.timeouts.length = 0
    }

}