import { createVNode } from 'vue'
import  * as $Icon from '@ant-design/icons-vue'

export const Icon = (props: { icon: string }) => {
  const { type } = props;
  return createVNode($Icon[type]);
}