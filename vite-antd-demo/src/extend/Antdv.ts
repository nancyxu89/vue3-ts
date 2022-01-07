import type { App } from "vue"
// import {
//   ConfigProvider,
//   Layout,
//   Empty,
//   Input,
//   InputNumber,
//   Button,
//   Switch,
//   Radio,
//   Checkbox,
//   Select,
//   Card,
//   Form,
//   FormModel,
//   Row,
//   Col,
//   Table,
//   Tabs,
//   Icon,
//   Badge,
//   Popover,
//   Dropdown,
//   List,
//   Avatar,
//   Breadcrumb,
//   Steps,
//   Spin,
//   Menu,
//   Drawer,
//   Tooltip,
//   Alert,
//   Tag,
//   Divider,
//   DatePicker,
//   TimePicker,
//   Upload,
//   Collapse,
//   Progress,
//   Skeleton,
//   Popconfirm
// } from "ant-design-vue"
// const components = [
//   ConfigProvider,
//   Layout,
//   Empty,
//   Input,
//   InputNumber,
//   Button,
//   Switch,
//   Radio,
//   Checkbox,
//   Select,
//   Card,
//   Form,
//   FormModel,
//   Row,
//   Col,
//   Table,
//   Tabs,
//   Icon,
//   Badge,
//   Popover,
//   Dropdown,
//   List,
//   Avatar,
//   Breadcrumb,
//   Steps,
//   Spin,
//   Menu,
//   Drawer,
//   Tooltip,
//   Alert,
//   Tag,
//   Divider,
//   DatePicker,
//   TimePicker,
//   Upload,
//   Collapse,
//   Progress,
//   Skeleton,
//   Popconfirm
// ]
// Vue.prototype.$confirm = Modal.confirm
// Vue.prototype.$modal = Modal
// Vue.prototype.$message = message
// Vue.prototype.$notification = notification
// Vue.prototype.$info = Modal.info
// Vue.prototype.$success = Modal.success
// Vue.prototype.$error = Modal.error
// Vue.prototype.$warning = Modal.warning

import { ConfigProvider, Input, InputNumber, Button, Radio, Checkbox, Modal, Spin, Menu, Popover, Table, Tabs, Tag, Divider, DatePicker, TimePicker, Upload, Collapse, Progress, Skeleton } from "ant-design-vue"
const components = [ConfigProvider, Input, InputNumber, Button, Radio, Checkbox, Modal, Spin, Menu, Popover, Table, Tabs, Tag, Divider, DatePicker, TimePicker, Upload, Collapse, Progress, Skeleton]

export function setupAntd(app: App<Element>): void {
  components.forEach((component: any) => {
    app.use(component)
  })
}