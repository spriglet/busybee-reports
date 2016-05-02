var config = require('./swconfig');
var comb = require('js-combinatorics');
function dispatch(fn, args) {
    fn = (typeof fn == "function") ? fn : window[fn];  // Allow fn to be a function object or the name of a global function
    return fn.apply(this, args || []);  // args is optional, use an empty array by default
}
// builds the application paths
function Paths(){
    this.branches = [];
}
// main is the main path and branches are the branches of the paths. 
Paths.prototype.chain = function (callback){    
    this.branches.forEach(function(path){ 
    	 callback(path);
    });
}
Paths.prototype.ispath = function(path){
    return (-1!=this.branches.indexOf(path ));
}
Paths.prototype.addbranches = function(main,branches){
   var test = branches.map(function(arr) {  return '/'+main+'/'+arr;  });
   func = comb.cartesianProduct;
   var paths = dispatch(func, branches).toArray().map(function(arr) {  return '/'+main+'/'+arr.join('/');  });
   this.branches = this.branches.concat(paths);
};


module.exports =  new Paths();
