
const func = require('./02');

const sampleString = 'Russian federation ## Cheese @ Tilsiter @@@ Tasty cheese __ 300\n' +
    'Italy @ Gun @@ Beretta @@@ 486 Parallelo @@@@ 412615\n' +
    'Some another text without\n' +
    'any\n' +
    'useful\n' +
    'data\n' +
    ':(';

console.log(func(sampleString));