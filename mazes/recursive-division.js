/*class RecursiveDivision {

    create(graph) {
        for (let i = 0; i < graph.height; i++) {
            graph.insert(new Wall(0, i))
            graph.insert(new Wall(graph.width - 1, i))
        }
        for (let i = 0; i < graph.width; i++) {
            graph.insert(new Wall(i, 0))
            graph.insert(new Wall(i, graph.height - 1))
        }
        this.divide(graph, 1, 1, graph.width - 2, graph.height - 2)
    }

    divide(graph, x, y, w, h) {
        if (w <= 2 || h <= 2) return

        var wallX = this.randomInt(x + 1, x + w - 2),
            wallY = this.randomInt(y + 1, y + h - 2)

        if (this.vertical(w, h)) {

            for (let i = y; i < y + h; i++) {
                graph.insert(new Wall(wallX, i))
            }
            var node = new Node(wallX, this.randomInt(y, y + h - 1))
            graph.insert(node)
            graph.insert(graph.start)
            graph.insert(graph.end)

            this.divide(graph, x, y, wallX - x, h)
            this.divide(graph, wallX + 1, y, w - (wallX + 1 - x), h)

        } else {

            for (let i = x; i < x + w; i++) {
                graph.insert(new Wall(i, wallY))
            }
            graph.insert(new Node(this.randomInt(x, x + w - 1), wallY))
            graph.insert(graph.start)
            graph.insert(graph.end)

            this.divide(graph, x, y, w, wallY - y)
            this.divide(graph, x, wallY + 1, w, h - (wallY + 1 - y))

        }
    }

    vertical(w, h) {
        if (w > h) return true
        if (w < h) return false
        return Math.random() > 0.5
    }

    // inclusive
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}*/