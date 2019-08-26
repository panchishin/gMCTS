
var gMCTS = require("../index.js")

function newSim() {
    return {
        'state' : 's0' ,
        'get_actions' : function() {
            return { 
                's0' : ['a1','a2'] , 
                's1' : ['a3','a4'] , 
                's2' : ['a5','a6'] ,
                's5' : ['a9']
            }[this.state]
        },
        'do_action' : function(action) {
            this.state = {
                'a1' : 's1',
                'a2' : 's2',
                'a3' : 's3',
                'a4' : 's4',
                'a5' : 's5',
                'a6' : 's6',
                'a9' : 's9'
            }[action]
        },
        'is_terminal' : function() {
            return ['s1','s2','s3','s9'].indexOf(this.state) >= 0
        },
        'value' : function() {
            return {
                's1' : 20,
                's2' : 10,
                's3' : 0,
                's9' : 14
            }[this.state]
        }
    }
}


module.exports = {

	'solve known simulation' : function(beforeExit, assert) {

        mcts_search = gMCTS.new()

        for (var trial=1 ; trial < 5 ; trial++) {
            mcts_search.simulate(newSim(),2)
        }

		assert.equal('a2', mcts_search.best_action())

        var action_values = mcts_search.action_scores() 
        assert.equal('a1', action_values[0].action )
        assert.equal(10, action_values[0].value )
        assert.equal('a2', action_values[1].action )
        assert.equal(12, action_values[1].value )

	},

	'UCB1' : function(beforeExit, assert) {

        mcts_search = gMCTS.new()

        for (var trial=1 ; trial < 5 ; trial++) {
            mcts_search.simulate(newSim(),2)
        }

        assert.equal( 1167, Math.round( mcts_search.children['a1'].UCB1() * 100 ) )
        assert.equal( 1367, Math.round( mcts_search.children['a2'].UCB1() * 100 ) )
	}
}

