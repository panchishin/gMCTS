// monte carlo tree search


function State() {
    return {
        '_total' : 0,
        '_num' : 0,

        'value' : function() {
            // can return infinity
            // return this._num == 0 ? infinity : this._total / this._num
            return this._total / this._num
        },
        'UCB1' : function(C=2) {
            if (this._parent == false) return "None";
            if (this._num == 0 || this._parent._num == 0) { return 1/0 }
            return this.value() + C * Math.sqrt( Math.log( this._parent._num ) / this._num )
        },
        'add' : function(value) {
            this._total += value;
            this._num += 1;
            if (this._parent != false) {
                this._parent.add(value)
            }
        },

        '_parent' : false,
        'action' : "None",
        'children' : {},
        'add_child' : function(action) {
            var child = State();
            child.action = action;
            child._parent = this
            this.children[action] = child
            return child
        },

        'add_children' : function(actions) {
            for (action of actions) { this.add_child(action) }
        },

        'action_scores' : function() {
            return Object.values(this.children).map(function(child){ return {action:child.action,value:child._total/child._num} })
        },

        'best_action' : function() {
            var all_scores = this.action_scores();
            if (all_scores.length == 0) return "None"
            var result = all_scores.reduce(function(next,best) { return next.value > best.value ? next : best },all_scores[0])
            return result.action
        },

        'node_expansion' : function(sim,C) {
            var children = Object.values(this.children).sort(function(a,b){return a.action > b.action ? a : b})
            
            // if there are children, calculate UCB1 and choose best
            if ( children.length > 0 ) {
                var UCB1_scores = children.map( function(child){ return [child,child.UCB1(C)] })
                var best = UCB1_scores.reduce(function(v,b) { return v[1] > b[1] ? v : b },UCB1_scores[0])[0]
                sim.do_action(best.action)
                return best._num == 0 ? best : best.node_expansion(sim,C)

            // if there are no children, expand
            } else {
                var actions = sim.get_actions();
                if (actions.length == 0) return this;
                for (action of actions) this.add_child(action);
                sim.do_action(actions[0])
                return this.children[actions[0]];
            }
        },

        'rollout' : function(sim) {
            while(!sim.is_terminal()) {
                var actions = sim.get_actions()
                sim.do_action(actions[0])
            }
            return sim.value()
        },

        'backprop' : function(value) {
            this.add(value);
        },

        'simulate' : function(sim,C=2) {
            var child = this.node_expansion(sim,C);
            var value = child.rollout(sim);
            child.backprop(value);
            return value;
        }
    }
}

module.exports = {
    'new' : State
}