<template>
  <c-simple-grid
    class="word"
    :columns="5"
    :spacing="2"
  >
    <template v-for="(_, i) in value">
      <letter
        ref="letters"
        :key="'letter-' + i"
        v-model="value[i]"
        :index="i"
        @input="filled"
        @paste="onPaste"
      />
    </template>
  </c-simple-grid>
</template>

<script>
import { CSimpleGrid } from '@chakra-ui/vue'
import Letter from './Letter'

export default {
  name: 'Word',

  components: {
    CSimpleGrid,
    Letter
  },

  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    filled (_, index) {
      if (index < 4) {
        setTimeout(() => {
          this.$refs.letters[index + 1].$el.children[0].focus()
        }, 200)
      }
      this.$emit('input', this.value)
    },

    onPaste (text) {
      const letters = text.split('')
      this.$emit('input', this.value.map((l, i) => {
        l.letter = letters[i]
        return l
      }))
    }
  }
}
</script>
