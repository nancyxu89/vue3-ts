import BaseConfig from './base'

let Config: Config = () => import('./' + process.env.CODE_ENV)
Object.assign(BaseConfig, Config.default)


export default BaseConfig