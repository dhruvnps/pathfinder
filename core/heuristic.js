class Heuristic {

    static manhattan(node, end) {
        return Math.abs(node.x - end.x)
            + Math.abs(node.y - end.y)
    }

    static euclidean(node, end) {
        return Math.sqrt(
            Math.abs(node.x - end.x) ** 2
            + Math.abs(node.y - end.y) ** 2
        )
    }

}
