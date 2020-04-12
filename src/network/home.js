import { request } from './request'
// 获取轮播图和推荐信息
export function getHomeMultidata () {
  return request({
    url: '/home/multidata'
  })
}
// 获取商品信息
export function getHomeGoods (type, page) {
  return request({
    url: '/home/data',
    params: {
      type, page
    }
  })
}
