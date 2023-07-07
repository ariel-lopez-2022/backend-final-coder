const cluster = require('cluster');

const {cpus} = require('os')

console.log(cpus().length)
