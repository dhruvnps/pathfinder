class Stats {

    constructor(container) {
        this.stats = container
            .append('div')
            .style('position', 'absolute')
            .style('bottom', 0)
            .style('left', 0)
            .attr('class', 'stats')

        this.time = this.stats.append('span')
        this.operations = this.stats.append('span')
        this.length = this.stats.append('span')
    }

    values(time, operations, length) {
        this.time.text(`time: ${time.toFixed(3)}ms`)
        this.operations.text(`operations: ${operations}`)
        this.length.text(`length: ${length}`)
    }

}