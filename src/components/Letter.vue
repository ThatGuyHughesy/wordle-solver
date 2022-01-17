<template>
  <c-box class="letter">
    <c-input
      :value="value.letter"
      type="text"
      size="lg"
      variant="filled"
      maxlength="1"
      mb="1"
      :class="classNames"
      @keypress="letterOnly"
      @input="changeLetter"
      @paste="onPaste"
    />
    <c-menu>
      <c-menu-button
        w="54px"
        h="24px"
      >
        <c-icon name="chevron-down" />
      </c-menu-button>
      <c-menu-list
        min-w="0"
        w="120px"
      >
        <c-menu-item
          v-for="status in statuses"
          :key="status.value"
          :value="status.value"
          @click="changeStatus(status.value)"
        >
          <c-box
            :bg="status.color"
            w="4"
            h="4"
            mr="1"
          />
          {{ status.label }}
        </c-menu-item>
      </c-menu-list>
    </c-menu>
  </c-box>
</template>

<script>
import { CBox, CInput, CMenu, CMenuItem, CIcon } from '@chakra-ui/vue'

export default {
  name: 'Letter',

  components: {
    CBox,
    CInput,
    CMenu,
    CMenuItem,
    CIcon
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

  data () {
    return {
      statuses: [{
        label: 'Correct',
        value: 'CORRECT',
        color: '#538d4e'
      }, {
        label: 'Present',
        value: 'PRESENT',
        color: '#b59f3b'
      }, {
        label: 'Absent',
        value: 'ABSENT',
        color: '#3a3a3c'
      }]
    }
  },

  computed: {
    classNames () {
      const classNames = []
      if (this.value.letter) {
        classNames.push('filled')
      }
      if (this.value.status) {
        classNames.push(this.value.status.toLowerCase())
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

    changeLetter (letter) {
      this.$emit('input', {
        letter: letter.toLowerCase(),
        status: this.value.status
      }, this.index)
    },

    changeStatus (status) {
      this.$emit('input', {
        letter: this.value.letter,
        status
      })
    }
  }
}
</script>

<style scoped>
  .letter >>> input {
    background-color: #121213;
    font-weight: 800;
    color: #d8dadc;
    text-align: center;
    text-transform: uppercase;
    border-color: #3a3a3c;
    border-radius: 0;
    vertical-align: center;
  }

  .letter >>> input:hover {
    background-color: #121213;
  }

  .letter >>> input.filled,
  .letter >>> input:focus {
    border-color: #565758;
  }

  .letter >>> input.correct {
    background-color: #538d4e;
    border-color: #538d4e;
  }

  .letter >>> input.present {
    background-color: #b59f3b;
    border-color: #b59f3b;
  }

  .letter >>> input.absent {
    background-color: #3a3a3c;
    border-color: #3a3a3c;
  }

  .letter > button,
  .letter > button:hover {
    background-color: #3a3a3c;
    border-radius: 0;
  }

  .letter .status {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
</style>
