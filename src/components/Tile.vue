<template>
  <c-box>
    <letter
      v-model="value.letter"
      :status="value.status"
      @input="onLetterChange"
      @arrow:left="onArrowLeftLetter"
      @arrow:right="onArrowRightLetter"
      @paste="onPaste"
    />
    <status @input="onStatusChange" />
  </c-box>
</template>

<script>
import Letter from '@/components/Letter'
import Status from '@/components/Status'

export default {
  name: 'Tile',

  components: {
    Letter,
    Status
  },

  props: {
    value: {
      type: Object,
      required: true
    },

    index: {
      type: Number,
      required: true
    }
  },

  methods: {
    onPaste (text) {
      this.$emit('paste', text)
    },

    onArrowLeftLetter () {
      this.$emit('arrow:left:letter', this.index)
    },

    onArrowRightLetter () {
      this.$emit('arrow:right:letter', this.index)
    },

    onLetterChange (letter) {
      this.$emit('input', {
        letter: letter.toLowerCase(),
        status: this.value.status
      }, 'LETTER', this.index)
    },

    onStatusChange (status) {
      this.$emit('input', {
        letter: this.value.letter,
        status
      }, 'STATUS', this.index)
    }
  }
}
</script>
