<template>
  <c-input
    :value="value"
    type="text"
    size="lg"
    variant="filled"
    maxlength="1"
    mb="1"
    bg="#121213"
    font-weight="800"
    color="#d8dadc"
    text-align="center"
    text-transform="uppercase"
    border-color="#3a3a3c"
    border-radius="0"
    vertical-align="center"
    :class="classNames"
    onfocus="this.select();"
    @input="onLetterChange"
    @keypress="letterOnly"
    @keyup.left="$emit('arrow:left')"
    @keyup.right="$emit('arrow:right')"
    @paste="onPaste"
  />
</template>

<script>
import { CInput } from '@chakra-ui/vue'

export default {
  name: 'Letter',

  components: {
    CInput
  },

  props: {
    value: {
      type: String,
      default: null
    },

    status: {
      type: String,
      default: null
    }
  },

  computed: {
    classNames () {
      const classNames = []
      if (this.value) {
        classNames.push('filled')
      }
      if (this.status) {
        classNames.push(this.status.toLowerCase())
      }
      return classNames
    }
  },

  methods: {
    letterOnly (event) {
      const charCode = event.charCode
      if (charCode >= 97 && charCode <= 122) {
        return true
      } else if (charCode >= 65 && charCode <= 90) {
        return true
      } else {
        event.preventDefault()
      }
    },

    onPaste (event) {
      const text = event.clipboardData.getData('text')
      if (text) {
        this.$emit('paste', text)
      }
    },

    onLetterChange (letter) {
      this.$emit('input', letter.toLowerCase())
    }
  }
}
</script>

<style scoped>
  input:hover {
    background-color: #121213;
  }

  input.filled,
  input:focus {
    border-color: #565758;
  }

  input.correct {
    background-color: #538d4e;
    border-color: #538d4e;
  }

  input.present {
    background-color: #b59f3b;
    border-color: #b59f3b;
  }

  input.absent {
    background-color: #3a3a3c;
    border-color: #3a3a3c;
  }
</style>
