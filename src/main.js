import Vue from 'vue'
import App from './App.vue'
import Chakra, {
  CThemeProvider,
  CColorModeProvider,
  CBox,
  CReset
} from '@chakra-ui/vue'

Vue.use(Chakra)

Vue.config.productionTip = false

new Vue({
  render (h) {
    return h(CThemeProvider, [
      h(CColorModeProvider, [h(CBox, [h(CReset), h(App)])])
    ])
  }
}).$mount('#app')
