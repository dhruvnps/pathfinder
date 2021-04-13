class Visual {

    static init(container, unit, delay) {
        this.delay = delay
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

        this.stats = new Stats(container)
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

        var t0 = performance.now()
        var path = this.finder.path(this.graph)
        var t1 = performance.now()

        if (path) {
            var operations = this.callstack.length,
                length = 0
            for (var node of path) length += node.weight
            this.stats.values(t1 - t0, operations, length)
            this.path(path)
        }

        this.runstack(this.delay)
    }

    static draw(node, erase, weight = 1) {
        if (!node.equals(this.graph.start)
            && !node.equals(this.graph.end))
            this.graph.insert(erase
                ? new Node(node.x, node.y)
                : weight > 1
                    ? new Node(node.x, node.y, weight)
                    : new Wall(node.x, node.y))
        this.stop()
    }

    static path(nodes) {
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

    static runstack(delay) {
        this.callstack.forEach(function (action, idx) {
            Visual.timeouts.push(setTimeout(action, delay * idx))
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