class Grid {

    constructor(graph, unit) {
        this.graph = graph
        this.unit = unit

        this.svg = d3
            .select('body')
            .append('svg')

        this.grid = this.svg
            .attr('width', '100vw')
            .attr('height', '100vh')
            .selectAll()
            .data(this.graph.graph)
            .enter().append('g')
            .selectAll()
            .data(d => d)
            .enter().append('rect')
            .attr('width', this.unit - 1)
            .attr('height', this.unit - 1)
            .attr('x', d => d.x * this.unit)
            .attr('y', d => d.y * this.unit)

        this.listener()
        this.reset()
    }

    listener() {
        var down = false,
            erase = false,
            node
        this.svg.on('mouseup', () => {
            down = false
            Visual.run()
        })
        this.svg.on('mousedown', e => {
            down = true
            node = e.path[0].__data__
            erase = node.wall
            this.graph.insert(erase
                ? new Node(node.x, node.y)
                : new Wall(node.x, node.y))
            this.reset()
        })
        this.svg.on('mousemove', e => {
            if (down) {
                var next = e.path[0].__data__
                if (node && next && !node.equals(next)) {
                    node = next
                    this.graph.insert(erase
                        ? new Node(node.x, node.y)
                        : new Wall(node.x, node.y))
                    this.reset()
                }
            }
        })
    }

    getBlock(node) {
        return d3.select(this.grid._groups[node.y][node.x])
    }

    colorize(node, color) {
        if (!node.equals(this.graph.start)
            && !node.equals(this.graph.end))
            this.getBlock(node)
                .style('fill', color)
    }

    open(node) {
        this.colorize(node, 'lightgrey')
    }

    close(node) {
        this.colorize(node, 'lightblue')
    }

    path(node) {
        this.colorize(node, 'red')
    }

    reset() {
        Visual.stop()

        this.svg
            .selectAll('g')
            .data(this.graph.graph)
            .selectAll('rect')
            .data(d => d)

        this.grid
            .style('fill', d => d.wall ? 'black'
                : d.equals(this.graph.start) ? 'blue'
                    : d.equals(this.graph.end) ? 'green'
                        : '#dfdfdf')
    }

}