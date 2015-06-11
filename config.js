module.exports = {
  port: 80,
  debug: false,
  site: {
    "url": "http://youzhihu.com/",
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
    ACCESS_KEY: 'yrYrw_dBLGHGlzdjcydUN-0_xRR-n95zkIC8ANbR',
    SECRET_KEY: '4aijHwjKXB20z40SaexGR2k4l9EGQOI6EWvZh7_2',
    buckname: 'zhihu',
    domain: 'http://7xjjyj.com1.z0.glb.clouddn.com/'
  }
};
