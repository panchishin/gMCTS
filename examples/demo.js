var gMCTS = require("../index.js")


/*

A simulation that mimics John Levine's example in this video https://www.youtube.com/watch?v=UXW2yZndl7U

There are 7 states, S0, S1, ... S6, with actions (A1, A2 ... A6) that go to exactly their corresponding state.
The simulation starts in S0, which has actions A1 and A2 that go to S1 and S2 accordingly.  
The whole graph looks like this

S0 ---> action A1 ---> S1 ---> action A3 ---> S3
    |                      |
    |                      --> action A4 ---> S4 
    |
    |
    --> action A2 ---> S2 ---> action A5 ---> S5
                           |
                           --> action A6 ---> S6

The rollout values for the different states are as follows

S1 = 20
S2 = 10
S3 = 0
S5 = 14

*/
function newSim() {
    return {
        'state' : 's0' ,
        'get_actions' : function() {
            return { 
                's0' : ['a1','a2'] , 
                's1' : ['a3','a4'] , 
                's2' : ['a5','a6'] 
            }[this.state]
        },
        'do_action' : function(action) {
            this.state = {
                'a1' : 's1',
                'a2' : 's2',
                'a3' : 's3',
                'a4' : 's4',
                'a5' : 's5',
                'a6' : 's6'
            }[action]
        },
        'is_terminal' : function() {
            return ['s1','s2','s3','s5'].indexOf(this.state) >= 0
        },
        'value' : function() {
            return {
                's1' : 20,
                's2' : 10,
                's3' : 0,
                's5' : 14
            }[this.state]
        }
    }
}



function outputInfo(name,node,indent="    ") {
    console.log(indent + name + " : total " + node._total + " , number = " + node._num + " , UCB1 = " + node.UCB1() )
    for (name of Object.keys(node.children)) {
        outputInfo(name,node.children[name],indent+"    ")
    }
}

console.log("\nA simulation that mimics John Levine's example")
mcts_search = gMCTS.new()
outputInfo("S0",mcts_search)


for (var trial=1 ; trial < 5 ; trial++) {
    console.log("\nRunning trial # " + trial + "\n")
    mcts_search.simulate(newSim(),2)
    outputInfo("S0",mcts_search)
}

console.log("")

console.log("The best next action based on the trials so far is " + mcts_search.best_action() + "\n")

