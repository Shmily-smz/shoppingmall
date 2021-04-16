import {request} from './request'
//左边的文字
export function getCategory() {
    return request({
      url: '/category'
    })
  }
 //右边对应的图片 
  export function getSubcategory(maitKey) {
    return request({
      url: '/subcategory',
      params: {
        maitKey
      }
    })
  }
  //下面的推荐，就不做了
  export function getCategoryDetail(miniWallkey, type) {
    return request({
      url: '/subcategory/detail',
      params: {
        miniWallkey,
        type
      }
    })
  }