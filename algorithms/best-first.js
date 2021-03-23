class BestFirst extends AStar {
    weighted = false
    constructor(heuristic) {
        super((...args) =>
            heuristic(...args) * 1000000)
    }
}