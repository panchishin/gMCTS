
var gMCTS = require("../index.js")

function newSim() {
    return {
        'get_actions' : function() {
            // return a list of possible actions for current interal state of this simulation
            // return ['left','right',...]
        },
        'do_action' : function(action) {
            // modify the internal state given the action
        },
        'is_terminal' : function() {
            // return true if the simulation is at an end state, false otherwise
        },
        'value' : function() {
            // return the value of this simulation as an integer or floating point
            // return 42
        }
    }
}

// create a new mcts search
var mcts_search = gMCTS.new()

// run 100 simulations
for (var trial=1 ; trial < 100 ; trial++) {
    mcts_search.simulate(newSim())
}

// print out the best action
mcts_search.best_action()
