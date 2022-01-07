export const powerUpdate = (state, { path, data }) => {
  state.powerControl[path] = data
}

export const initMenuData = (state, data) => {
  state.menuData = data
}

export const initUserInfo = (state, data) => {
  state.userInfo = data
}
