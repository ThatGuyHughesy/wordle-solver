const fs = require('fs')
const words = require('./wordleWords')

const letterFrequencies = {
  a: [0, 0, 0, 0, 0],
  b: [0, 0, 0, 0, 0],
  c: [0, 0, 0, 0, 0],
  d: [0, 0, 0, 0, 0],
  e: [0, 0, 0, 0, 0],
  f: [0, 0, 0, 0, 0],
  g: [0, 0, 0, 0, 0],
  h: [0, 0, 0, 0, 0],
  i: [0, 0, 0, 0, 0],
  j: [0, 0, 0, 0, 0],
  k: [0, 0, 0, 0, 0],
  l: [0, 0, 0, 0, 0],
  m: [0, 0, 0, 0, 0],
  n: [0, 0, 0, 0, 0],
  o: [0, 0, 0, 0, 0],
  p: [0, 0, 0, 0, 0],
  q: [0, 0, 0, 0, 0],
  r: [0, 0, 0, 0, 0],
  s: [0, 0, 0, 0, 0],
  t: [0, 0, 0, 0, 0],
  u: [0, 0, 0, 0, 0],
  v: [0, 0, 0, 0, 0],
  w: [0, 0, 0, 0, 0],
  x: [0, 0, 0, 0, 0],
  y: [0, 0, 0, 0, 0],
  z: [0, 0, 0, 0, 0]
}
const total = words.length

for (const word of words) {
  const letters = word.split('')

  for (const [index, letter] of letters.entries()) {
    letterFrequencies[letter][index] += 1
  }
}

for (const letter in letterFrequencies) {
  letterFrequencies[letter] = letterFrequencies[letter].map(count => count / total)
}

fs.writeFile('../data/scores.js', `export default ${JSON.stringify(letterFrequencies, null, 2).replaceAll('"', "'")}`, err => {
  if (err) {
    console.error(err)
  }
})
