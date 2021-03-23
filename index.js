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

function bestfirst(btn) {
    setActive(btn)
    Visual.find(new BestFirst(Heuristic.manhattan))
}

function bestfirst(btn) {
    setActive(btn)
    Visual.find(new BestFirst(Heuristic.manhattan))
}

function weight(btn) {
    if (Visual.weight) {
        Visual.weight = null
        d3.select(btn).attr('class', null)
    }
    else {
        Visual.weight = 10
        d3.select(btn).attr('class', 'active')
    }
}


function setActive(btn) {
    d3.selectAll('.left button')
        .attr('class', null)

    d3.select(btn)
        .attr('class', 'active')
}
