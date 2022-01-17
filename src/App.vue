<template>
  <c-box
    class="game"
    py="4"
    align="center"
    justify="center"
  >
    <c-box>
      <c-heading
        class="uppercase"
        size="xl"
        as="h1"
      >
        Wordle <c-text
          color="pink.400"
          style="display: inline;"
        >
          Solver
        </c-text>
      </c-heading>
      <c-divider
        mt="2"
        color="#3a3a3c"
      />
    </c-box>
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
          <word
            v-model="guesses[i]"
            @input="changed"
          />
          <c-button
            v-if="i > 0"
            w="100%"
            mt="2"
            variant-color="gray"
            @click="remove(i)"
          >
            Remove Guess
          </c-button>
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
    <c-box
      v-if="possibleWords.length"
      mt="8"
    >
      <c-divider
        mb="6"
        color="#3a3a3c"
      />
      <c-text
        font-size="2xl"
        font-weight="800"
        color="white"
        mb="2"
      >
        <c-text
          color="pink.400"
          style="display: inline;"
        >
          {{ possibleWords.length }}
        </c-text> Possible Word(s)
      </c-text>
      <c-list>
        <c-list-item
          v-for="word in possibleWords"
          :key="word"
        >
          <c-text
            font-size="lg"
            font-weight="700"
            color="white"
          >
            {{ word }}
          </c-text>
        </c-list-item>
      </c-list>
    </c-box>
  </c-box>
</template>

<script lang="js">
import { CBox, CHeading, CText, CDivider, CButton, CList, CListItem } from '@chakra-ui/vue'
import Word from './components/Word'
import words from './data/wordleWords'
import letterFrequencies from './data/letterFrequencies'

export default {
  name: 'App',

  components: {
    CBox,
    CHeading,
    CText,
    CDivider,
    CButton,
    CList,
    CListItem,
    Word
  },

  data () {
    return {
      guesses: [],
      possibleWords: [],
      solving: false
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
    },

    solve () {
      this.solving = true

      const absent = this.guesses.map(g => g.filter(l => l.status === 'ABSENT').map(a => a.letter)).flat().filter((value, index, self) => self.indexOf(value) === index)
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
        return present.flat().every(l => word.indexOf(l) > -1)
      })

      const scoredWords = filteredWords.map(w => {
        const letters = new Set(w.split(''))
        let score = 0
        for (const letter of letters) {
          score += letterFrequencies[letter]
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

      this.solving = false
    }
  }
}
</script>

<style scoped>
  .game {
    width: 100%;
    max-width: 400px;
    height: 100%;
    margin: auto;
  }

  .game >>> h1 {
    color:#d8dadc;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
</style>
