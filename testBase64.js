const b = Buffer.from('hello, world');
console.log(b);
// <Buffer 68 65 6c 6c 6f 2c 20 77 6f 72 6c 64>

const s = b.toString('base64');
console.log(s);
// aGVsbG8sIHdvcmxk

console.log(b.toString());
// hello, world

/*
<img src="data:image/png;base64,iVBORw0KGgoAAA
ANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU
5ErkJggg==" alt="Red dot" />

*/
