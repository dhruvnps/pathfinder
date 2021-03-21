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
        var erase, node
        this.grid
            .on('mouseup', function () {
                node = null
                Visual.run()
            })
            .on('mousedown', function () {
                node = d3.select(this).datum()
                erase = node.wall
                Visual.draw(node.x, node.y, erase)
            })
            .on('mousemove', function () {
                if (node) {
                    var next = d3.select(this).datum()
                    if (next && !node.equals(next)) {
                        node = next
                        Visual.draw(node.x, node.y, erase)
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
