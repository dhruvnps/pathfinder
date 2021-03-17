const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

var algorithm

algorithm = !true ? BreadthFirst : AStar

EMPTY = 0, WALL = 1, START = 2, END = 3
DELTAS = [[0, 1], [1, 0], [0, -1], [-1, 0]]

DELAY = { search: 4, path: 10 }
VISUAL = {
    path: 'red',
    done: 'lightblue',
    edge: 'lightgrey',
}

const
    size = { x: 30, y: 20 },
    unit = 30,
    gap = 1,
    start = { x: 5, y: 10 },
    end = { x: 24, y: 10 },
    graph_colors = {
        [EMPTY]: '#dfdfdf',
        [START]: 'blue',
        [END]: 'green',
        [WALL]: 'black',
    }

window.onload = function () {
    canvas.width = size.x * unit
    canvas.height = size.y * unit
    var graph = Array(size.y).fill().map(() => Array(size.x).fill(EMPTY))
    graph[start.y][start.x] = START
    graph[end.y][end.x] = END
    draw(graph)
    listener(graph)
}

function listener(graph) {
    algorithm.shortest(graph, start.x, start.y, end.x, end.y)

    var down = false,
        erase = false,
        x, y;
    canvas.addEventListener('mouseup', () => {
        algorithm.shortest(graph, start.x, start.y, end.x, end.y)

        down = false
    })
    canvas.addEventListener('mousedown', e => {
        algorithm.breakRun()

        down = true
        x = mouse(e).x
        y = mouse(e).y
        erase = graph[y][x] == WALL
        edit(graph, x, y, erase ? EMPTY : WALL)
    })
    canvas.addEventListener('mousemove', e => {
        if (x != null && y != null && down) {
            if (mouse(e).x != x || mouse(e).y != y) {
                x = mouse(e).x
                y = mouse(e).y
                edit(graph, x, y, erase ? EMPTY : WALL)
            }
        }
    })
}

function edit(graph, x, y, type) {
    if (graph[y][x] == START || graph[y][x] == END) return
    graph[y][x] = type
    draw(graph)
}

function mouse(e) {
    rect = canvas.getBoundingClientRect()
    x = Math.floor((e.clientX - rect.left) / unit)
    y = Math.floor((e.clientY - rect.top) / unit)
    return { x: x, y: y }
}

function draw(graph) {
    for (var y = 0; y < size.y; y++) {
        for (var x = 0; x < size.x; x++) {
            block(x, y, graph_colors[graph[y][x]])
        }
    }
}

function block(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x * unit, y * unit, unit - gap, unit - gap)
}
