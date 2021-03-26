class Node {

    constructor(x, y, weight = 1) {
        this.x = x
        this.y = y
        this.weight = weight
    }

    equals(node) {
        return this.x == node.x && this.y == node.y
    }

    open() {
        Visual.open(this)
        this.opened = true
    }

    close() {
        Visual.close(this)
        this.closed = true
    }

    reset() {
        this.closed = this.opened = this.path = false
    }
}

class Wall extends Node {
    constructor(x, y) {
        super(x, y, null)
        this.wall = true
    }
}