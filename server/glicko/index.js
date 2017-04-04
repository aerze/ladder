require('babel-core/register')({
  presets: ['es2015', 'react']
});

const main = require('./main').default;
const Comp = require('./Competitor').default;

console.log('MAIN:');
main();
// const comp = new Comp('Gus');
// console.log(comp);
console.log('MAIN: END');
