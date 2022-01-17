<template>
  <c-box
    w="100vw"
    max-w="100vw"
    min-h="100vh"
    bg="#121213"
    p="4"
  >
    <solver />
  </c-box>
</template>

<script>
import Solver from '@/components/Solver'

export default {
  name: 'App',

  components: {
    Solver
  }
}
</script>
