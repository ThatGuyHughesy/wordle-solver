<template>
  <c-menu>
    <c-menu-button
      w="54px"
      h="24px"
      bg="#3a3a3c"
      border-radius="0"
      _hover="bg: '#3a3a3c'"
      _active="bg: '#3a3a3c'"
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
        @click="onStatusChange(status.value)"
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
</template>

<script>
import { CBox, CMenu, CMenuItem, CIcon } from '@chakra-ui/vue'

export default {
  name: 'Status',

  components: {
    CBox,
    CMenu,
    CMenuItem,
    CIcon
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

  methods: {
    onStatusChange (status) {
      this.$emit('input', status)
    }
  }
}
</script>
