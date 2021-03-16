canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

EMPTY = 0, WALL = 1, START = 2, END = 3

COLORS = {
    [EMPTY]: '#e0e0e0',
    [START]: 'blue',
    [END]: 'green',
    [WALL]: 'black',
}

PATH = 'red'
SCAN = 'lightblue'

SIZE_X = 30
SIZE_Y = 20

S = { x: 5, y: 10 }
E = { x: 24, y: 10 }

UNIT = 30
GAP = 1

SCALE_X = SIZE_X * UNIT
SCALE_Y = SIZE_Y * UNIT

DELTAS = [[0, 1], [1, 0], [0, -1], [-1, 0]]

setup()

function setup() {
    canvas.width = SCALE_X
    canvas.height = SCALE_Y
    var graph = Array(SIZE_Y).fill().map(() => Array(SIZE_X).fill(EMPTY))
    graph[S.y][S.x] = START
    graph[E.y][E.x] = END
    draw(graph)
    listener(graph)
}

function listener(graph) {
    BreadthFirst.shortest(graph)

    var down = false
    var erase = false
    var x, y;
    document.addEventListener('mouseup', () => {
        BreadthFirst.shortest(graph)

        down = false
    })
    document.addEventListener('mousedown', e => {
        BreadthFirst.breakRun()

        down = true
        x = mouse(e).x
        y = mouse(e).y
        erase = graph[y][x] == WALL
        edit(graph, x, y, erase ? EMPTY : WALL)
    })
    document.addEventListener('mousemove', e => {
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
    x = Math.floor((e.clientX - rect.left) / UNIT)
    y = Math.floor((e.clientY - rect.top) / UNIT)
    return { x: x, y: y }
}

function draw(graph) {
    for (var y = 0; y < SIZE_Y; y++) {
        for (var x = 0; x < SIZE_X; x++) {
            block(x, y, COLORS[graph[y][x]])
        }
    }
}

function block(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x * UNIT, y * UNIT, UNIT - GAP, UNIT - GAP)
}