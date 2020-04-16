import { request } from './request'

// 获取商品分类数据
export function getCategory () {
  return request({
    url: '/category'
  })
}
// 根据分类获取子分类
export function getSubcategory (maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail (miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
