<template>
  <c-box mt="8">
    <c-divider
      mb="6"
      color="#3a3a3c"
    />
    <c-box v-if="possibleWords.length">
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
    <c-box v-else>
      <c-text
        font-size="2xl"
        font-weight="800"
        color="white"
        mb="2"
      >
        No Possible Words! &#129327;
      </c-text>
    </c-box>
  </c-box>
</template>

<script>
import { CBox, CText, CDivider, CList, CListItem } from '@chakra-ui/vue'

export default {
  name: 'PossibleWords',

  components: {
    CBox,
    CText,
    CDivider,
    CList,
    CListItem
  },

  props: {
    possibleWords: {
      type: Array,
      default: () => []
    }
  }
}
</script>
