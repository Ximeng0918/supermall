import Toast from './Toast'
const obj = {}

obj.install = function (Vue) {
  // 1.创建组件构造器
  const ToastContrustor = Vue.extend(Toast)

  // 2.new 的方式，根据组件的构造器，可以创建出来一个组件对象
  const toast = new ToastContrustor()

  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  // 在Vue的原型链上注册方法，控制组件
  Vue.prototype.$toast = (msg, duration = 2000) => {
    toast.message = msg
    toast.isShow = true
    setTimeout(() => {
      toast.isShow = false
    }, duration)
  }
}

export default obj
