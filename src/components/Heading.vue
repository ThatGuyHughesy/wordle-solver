<template>
  <c-box>
    <c-heading
      as="h1"
      size="xl"
      color="#d8dadc"
      font-weight="800"
      letter-spacing="2px"
      text-transform="uppercase"
    >
      Wordle
      <c-text
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
</template>

<script>
import { CBox, CHeading, CText, CDivider } from '@chakra-ui/vue'

export default {
  name: 'Heading',

  components: {
    CBox,
    CHeading,
    CText,
    CDivider
  }
}
</script>
