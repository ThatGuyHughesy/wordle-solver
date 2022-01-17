<template>
  <c-box>
    <c-simple-grid
      :columns="5"
      :spacing="2"
    >
      <template v-for="(_, i) in value">
        <tile
          ref="tile"
          :key="'tile-' + i"
          v-model="value[i]"
          :index="i"
          @input="onTileChange"
          @arrow:left:letter="onArrowLeftLetter"
          @arrow:right:letter="onArrowRightLetter"
          @paste="onPaste"
        />
      </template>
    </c-simple-grid>
    <c-button
      w="100%"
      mt="2"
      variant-color="gray"
      @click="$emit('remove')"
    >
      Remove Guess
    </c-button>
  </c-box>
</template>

<script>
import { CSimpleGrid, CBox, CButton } from '@chakra-ui/vue'
import Tile from '@/components/Tile'

export default {
  name: 'Guess',

  components: {
    CSimpleGrid,
    CBox,
    CButton,
    Tile
  },

  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  mounted () {
    setTimeout(() => {
      this.$refs.tile[0].$el.children[0].focus()
    }, 100)
  },

  methods: {
    onTileChange (value, type, index) {
      if (index < 4) {
        if (type === 'LETTER' && value.letter) {
          setTimeout(() => {
            this.$refs.tile[index + 1].$el.children[0].focus()
          }, 50)
        }
        if (type === 'STATUS' && value.status) {
          setTimeout(() => {
            this.$refs.tile[index + 1].$el.children[1].focus()
          }, 50)
        }
      }

      if (index === 4 && type === 'LETTER' && value.letter) {
        setTimeout(() => {
          this.$refs.tile[0].$el.children[1].focus()
        }, 50)
      }

      this.$emit('input', this.value)
    },

    onArrowLeftLetter (index) {
      if (index > 0) {
        setTimeout(() => {
          this.$refs.tile[index - 1].$el.children[0].focus()
        }, 50)
      }
    },

    onArrowRightLetter (index) {
      if (index < 4) {
        setTimeout(() => {
          this.$refs.tile[index + 1].$el.children[0].focus()
        }, 50)
      }
    },

    onPaste (text) {
      const letters = text.split('')
      this.$emit('input', this.value.map((t, i) => {
        t.letter = letters[i]
        return t
      }))
    }
  }
}
</script>
