class BestFirst extends AStar {

    constructor(heuristic) {
        super((...args) => heuristic(...args) * 1000000)
        this.weighted = false
    }

}