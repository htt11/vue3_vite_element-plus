import walkpath from "@/common/walkpath";

export default {
  sysTitle: '海量邮件数据关联分析系统',
  levelOptions: {
    1: '安全',
    2: '低危',
    3: '中危',
    4: '高危',
  },
  statusOptions: {
    1: '待检测',
    2: '检测中',
    3: '检测结束',
    4: '检测失败',
  },
  modelOptions: {
    'communic': '通讯模型',
    'language': '主题语言模型',
    'source1': '源头模型',
    'send': '发送模型',
    'software': '软件模型',
    'attachment': '附件模型',
    'subjectModel': '主题模型',
  },
  sendTools: [

  ],
  shortcuts: [{
    text: '最近7天',
    value: () => {
      return walkpath.getRangeDay(7);
    }
  }, {
    text: '最近30天',
    value: () => {
      return walkpath.getRangeDay(30);
    }
  }, {
    text: '最近一年',
    value: () => {
      return walkpath.getRangeDay(365);
    }
  }, {
    text: '全部',
    value: () => {
      return ['', '']
    }
  }, ]

}