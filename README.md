[![Downloads][downloads-image]][downloads-url] [![Auto Test Status][travis-image]][travis-url] [![license][license-image]][license-url] [![Gitter chat][gitter-image]][gitter-url]

# gMCTS : Generic Monte Carlo Tree Search

This implementation of MCTS makes minimal assumptions about your simulation (or game), allowing you
to focus on making your simulation and have gMCTS do the search.

Section Links : [Construction](#construction) , [Execution](#execution) , [Examples](#example) , [Phenotype](#phenotype) , [FAQ](#faq) , [Related](#related-ai-projects) , and [References](#references)


# Construction
### gMCTS constructor
```js
var gMCTS = require('gmcts')
var search = gMCTS.new()
```
Or as a one-liner
```js
var search = require('gmcts').new()
```

# Execution

### search.simulate( simulation , C=2 )
Do one full simulation.  This does everything needed under the covers needed for MCTS including the following steps : tree traversal, node expansion, rollout, and backprop.  `simulation` is an object that is or wraps your simulation, and `C` is the exploration constant (default of 2).  This returns the final output of the simulation.
```js
var result = search.simulate( simulation )
```



### search.best_action()
Retrive the action with the best score.
```js
var best = search.best_action()
```

If there are two actions, 'left' and 'right' with scores 7 and 2 respectively, then...
```js
console.log(action_n_score)
'left'
```

### search.action_scores()
Retrieve the actions and scores.
```js
var action_n_score = gMCTS.actions_and_scores()
```

If there are two actions, 'left' and 'right' with scores 7 and 2 respectively, then...
```js
console.log(action_n_score)
[ {action:'left',score:7} , {action:'right',score:2} ]
```




# Simulation
This is the specification of the simulation object that you pass to gMCTS
```js
var simulation = {
    'get_actions' : // return a list of possible actions given the current state of the simulation
        function get_actions(),
    'do_action' : // preform the given action 
        function do_action(action),
    'is_terminal' : // return True if the simulation has 'ended'
        function is_terminal(),
    'value' : // the 'value' of the simulation at its current state.  Only called if the simulation is terminal
        function value()
}
```

### get_actions
Must return a list of objects that can be an associative array key, like strings or integers.

### do_action
Is called with an action collected from get_actions.  This needs to update the internal state of the simulation.

### is_terminal
Return true if the simulation has 'ended', false otherwise.  The end condition is of your own choice, but ensure there is an end condition.  If your simulation doesn't end after a fixed number of actions, consider adding a counter and returning true for is_terminal after 1,000 or so actions, to avoid an infinite loop.

### value
The extimated value of the simulation



# Example
If you have installed this as a npm dependency first change directory to *node_modules/gmcts/*.

### Template
The template is a boiler plate of how to get started.  It has a dummy simulation stubbed out.  Execute it like so:
```
node examples/template.js 
```

### Demo
A simulation that mimics [John Levine's example in this video](https://www.youtube.com/watch?v=UXW2yZndl7U)
```
node examples/demo.js 
```

There are 7 states, S0, S1, ... S6, with actions (A1, A2 ... A6) that go to exactly their corresponding state.  The simulation starts in S0, which has actions A1 and A2 that go to S1 and S2 accordingly.  The whole graph looks like this
```
S0 ---> action A1 ---> S1 ---> action A3 ---> S3
    |                      |
    |                      --> action A4 ---> S4 
    |
    |
    --> action A2 ---> S2 ---> action A5 ---> S5
                           |
                           --> action A6 ---> S6
```
The rollout values for the different states are as follows
```
S1 = 20
S2 = 10
S3 = 0
S5 = 14
```

After 4 simulations `search.action_scores()` will correctly return that action A1 has a value of 10 and A2 has a value of 12.


# Related AI Projects
This is part of a set of related projects.

* [AlphaBeta](https://www.npmjs.com/package/alphabeta)
* [Boosting](https://www.npmjs.com/package/boosting)
* [GeneticAlgorithm](https://www.npmjs.com/package/geneticalgorithm)
* [gMCTS](https://www.npmjs.com/package/gmcts)
* [NearestNeighbour](https://www.npmjs.com/package/nearestneighbour)
* [NeuralNet](https://www.npmjs.com/package/neuralnet)

# References

* [Instructor: John Levine at the University of Strathclyde](https://www.youtube.com/watch?v=UXW2yZndl7U)
* [Wikipedia entry for MCTS](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search)


[gitter-url]: https://gitter.im/panchishin/gmcts
[gitter-image]: https://badges.gitter.im/panchishin/gmcts.png

[downloads-image]: http://img.shields.io/npm/dm/gmcts.svg
[downloads-url]: https://www.npmjs.com/~panchishin

[travis-url]: https://travis-ci.org/panchishin/gmcts
[travis-image]: http://img.shields.io/travis/panchishin/gmcts.svg

[license-image]: https://img.shields.io/badge/license-Unlicense-green.svg
[license-url]: https://tldrlegal.com/license/unlicense

