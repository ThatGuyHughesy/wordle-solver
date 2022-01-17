<template>
  <c-box
    w="400px"
    m="auto"
    py="4"
    align="center"
    justify="center"
  >
    <heading />
    <c-box
      w="300px"
      mt="8"
    >
      <c-box>
        <c-box
          v-for="(_, i) in guesses"
          :key="'word-' + i"
          :mt="i > 0 ? '4' : '0'"
        >
          <guess
            v-model="guesses[i]"
            @input="changed"
            @remove="remove(i)"
          />
        </c-box>
      </c-box>
      <c-box mt="8">
        <c-button
          w="100%"
          variant-color="blue"
          :disabled="guesses.length >= 5"
          @click="add"
        >
          Add Guess
        </c-button>
        <c-button
          w="100%"
          mt="2"
          variant-color="pink"
          :disabled="!validGuesses"
          :is-loading="solving"
          @click="solve"
        >
          Solve
        </c-button>
      </c-box>
    </c-box>
    <possible-words
      v-if="solved"
      :possible-words="possibleWords"
    />
  </c-box>
</template>

<script>
import { CBox, CButton } from '@chakra-ui/vue'
import Heading from '@/components/Heading'
import Guess from '@/components/Guess'
import PossibleWords from '@/components/PossibleWords.vue'
import words from '@/data/words'
import scores from '@/data/scores'

export default {
  name: 'Solver',

  components: {
    CBox,
    CButton,
    Heading,
    Guess,
    PossibleWords
  },

  data () {
    return {
      guesses: [],
      possibleWords: [],
      solving: false,
      solved: false
    }
  },

  computed: {
    validGuesses () {
      return this.guesses.every(g => {
        if (!g.length) {
          return false
        }
        return g.every(l => {
          return l.letter && l.status
        })
      })
    }
  },

  methods: {
    changed () {
      this.possibleWords = []
      this.solved = false
    },

    add () {
      this.guesses.push([{
        letter: null,
        status: null
      }, {
        letter: null,
        status: null
      }, {
        letter: null,
        status: null
      }, {
        letter: null,
        status: null
      }, {
        letter: null,
        status: null
      }])
    },

    remove (index) {
      this.$delete(this.guesses, index)
      this.possibleWords = []
      this.solved = false
    },

    solve () {
      this.solving = true
      this.solved = false

      const absent = this.unique(this.guesses.map(g => g.filter(l => l.status === 'ABSENT').map(a => a.letter)).flat())
      const present = new Array(5)
      const correct = new Array(5)

      for (const guess of this.guesses) {
        for (const [index, letter] of guess.entries()) {
          if (letter.status === 'CORRECT') {
            correct[index] = letter.letter
          }
          if (letter.status === 'PRESENT') {
            if (!present[index]) {
              present[index] = [letter.letter]
            } else {
              present[index].push(letter.letter)
            }
          }
        }
      }

      const presentUnique = this.unique(present.flat())

      const filteredWords = words.filter(word => {
        const letters = word.split('')
        for (const [index, letter] of letters.entries()) {
          if (absent.includes(letter)) {
            return false
          }
          if (correct[index]) {
            if (correct[index] !== letter) {
              return false
            }
          }
          if (present[index]) {
            if (present[index].includes(letter)) {
              return false
            }
          }
        }
        return presentUnique.every(l => word.indexOf(l) > -1)
      })

      const scoredWords = filteredWords.map(w => {
        const letters = w.split('')
        let score = 0
        for (const [index, letter] of letters.entries()) {
          score += scores[letter][index]
        }
        return [w, score]
      })

      this.possibleWords = scoredWords.sort(([, scoreA], [, scoreB]) => {
        if (scoreA > scoreB) {
          return -1
        }
        if (scoreA < scoreB) {
          return 1
        }
        return 0
      }).map(s => s[0])

      this.solved = true
      this.solving = false
    },

    unique (letters) {
      return letters.filter((value, index, self) => self.indexOf(value) === index)
    }
  }
}
</script>
