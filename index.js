var container = d3.select('.grid')
Visual.init(container)

function astar(btn) {
    setActive(btn)
    Visual.find(new AStar(Heuristic.manhattan))
}

function dijikstra(btn) {
    setActive(btn)
    Visual.find(new Dijikstra())
}

function breadthfirst(btn) {
    setActive(btn)
    Visual.find(new BreadthFirst())
}

function bestfirst(btn) {
    setActive(btn)
    Visual.find(new BestFirst(Heuristic.manhattan))
}

function setActive(btn) {
    d3.selectAll('button')
        .attr('class', null)

    d3.select(btn)
        .attr('class', 'active')
}