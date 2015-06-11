module.exports = {
  port: 80,
  debug: false,
  site: {
    "url": "http://izhihu.net/",
    "author": "nihgwu",
    "author_url": "yjhjstz#163.com",
    "source": "知乎日报",
    "source_url": "http://daily.zhihu.com",
    "name": "爱知乎",
    "title": "爱知乎 - 知乎日报网页版",
    "description": "爱知乎, 知乎日报网页版, 您在电脑和平板上阅读知乎日报的最佳方式",
    "keywords": "爱知乎, 知乎日报, 知乎日报网页版, 知乎日报电脑版, izhihu, zhihudaily, youzhihu"
  },
  navigators: [
    {
      "name": "最新",
      "link": "/"
    },
    {
      "name": "热门",
      "link": "/hot"
    },
    {
      "name": "专题",
      "link": "/section"
    },
    {
      "name": "日历",
      "link": "/date"
    }
  ],
  cdn: 'http://www.izhihu.net/',
  domain: 'http://7xjjyj.com1.z0.glb.clouddn.com',
  qiniu: {
    ACCESS_KEY: '',
    SECRET_KEY: '',
    buckname: 'zhihu',
    domain: 'http://7xjjyj.com1.z0.glb.clouddn.com/'
  }
};
