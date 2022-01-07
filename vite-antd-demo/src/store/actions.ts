export const powerUpdate = ({ commit }, { path, data }) => {
  // console.log(path, data)
  commit('powerUpdate', { path, data })
}

export const initMenuData = ({ commit }, data) => {
  commit('initMenuData', data)
}

export const initUserInfo = ({ commit }, data) => {
  commit('initUserInfo', data)
}
