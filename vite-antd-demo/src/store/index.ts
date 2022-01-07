import { createStore } from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as modules from './modules'

const store = createStore({
  state () {
    return {
      userInfo: {
        userName: 'test user',
        jobNumber: '****'
      },
      count: 0,
      powerControl: {
        powerUrl: ['home', 'noPage', 'noPowerPage'],
        allPowerUrl: [],
        openRefs: {}
      },
      menuData: [
        // { resName: 'Home', href: '#/home', id: '123' },
        // { resName: 'Home3', href: '#/home3', id: '345' },
        // { resName: 'issues', href: '#/issues', id: '556' },
      ]
    }
  },
  mutations: mutations,
  actions: actions,
  modules: modules
})

export default store
