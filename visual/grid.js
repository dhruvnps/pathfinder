class Grid {

    constructor(graph, unit, container) {
        this.graph = graph
        this.unit = unit

        this.svg = container
            .append('svg')

        this.grid = this.svg
            .attr('width', '100%')
            .attr('height', '100%')
            .selectAll()
            .data(this.graph.graph)
            .enter().append('g')
            .attr('class', 'row')
            .selectAll()
            .data(d => d)
            .enter().append('rect')
            .attr('class', 'block')
            .attr('width', this.unit)
            .attr('height', this.unit)
            .attr('x', d => d.x * this.unit)
            .attr('y', d => d.y * this.unit)
            .style('stroke', 'white')

        this.listener()
        this.reset()
    }

    listener() {
        var erase, node, self = this
        this.grid
            .on('mouseup', function () {
                node = null
                Visual.run()
            })
            .on('mousedown', function ({ }, d) {
                erase = d.wall || d.weight > 1
                Visual.draw(node = d, erase, self.weight)
            })
            .on('mousemove', function ({ }, d) {
                if (node && d && !node.equals(d))
                    Visual.draw(node = d, erase, self.weight)
            })
    }

    getBlock(node) {
        return d3.select(this.grid._groups[node.y][node.x])
    }

    colorize(node, color, isPath) {
        if (!node.equals(this.graph.start)
            && !node.equals(this.graph.end)
            && (node.weight == 1 || isPath))
            this.getBlock(node)
                .style('fill', node.weight > 1 && this.weighted
                    ? '#c00040' : color)
                .style('opacity', 1)

    }

    open(node) {
        this.colorize(node, 'lightgrey')
    }

    close(node) {
        this.colorize(node, 'lightblue')
    }

    path(node) {
        this.colorize(node, 'red', true)
    }

    reset() {
        this.svg
            .selectAll('.row')
            .data(this.graph.graph)
            .selectAll('.block')
            .data(d => d)

        this.grid
            .style('fill', d =>
                d.equals(this.graph.start) ? 'blue'
                    : d.equals(this.graph.end) ? 'green'
                        : d.weight > 1 && this.weighted ? 'purple'
                            : d.weight > 1 ? '#aa0055'
                                : d.wall ? 'black'
                                    : '#dfdfdf')
    }
}
