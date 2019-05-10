import request from '@/until/request'

export function getArticleList(param) {
    return request({
      url: 'http://www.blog.com:8083/api/admin/list',
      method: 'get',
      params: param
    })
  }
  export function getArticleDetails(param) {
    return request({
      url: 'http://www.blog.com:8083/api/admin/details',
      method: 'get',
      params: param
    })
  }

  export function addArticleSave(param) {
    return request({
      url: 'http://www.blog.com:8083/api/admin/insert',
      method: 'get',
      params: param
    })
  }
  export function ArticleImage(param) {
    return request({
      url: 'http://www.blog.com:8083/api/admin/upload',
      method: 'get',
      params: param
    })
  }