var blab = blab || {};

blab.class = function() {
  return function(args){
    if ( this instanceof arguments.callee ) {
      if ( typeof this.init == "function" )
        this.init.apply( this, args.callee ? args : arguments );
    } else
      return new arguments.callee( arguments );
  };
}

blab.namespace = function(namespace) {
    var i, len, ns, parent;
    ns = namespace.split('.');
    len = ns.length;
    parent = window;
    for ( i = 0; i < len; ++i ) {
        if ( ! parent[ns[i]] ) {
            parent[ns[i]] = {};
        }
        parent = parent[ns[i]];
    }
}
