// 创建奖惩表单的渲染数据
export default [
  [
    {
      itemName: 'staffName',
      initVal: '请输入员工姓名',
      labelTxt: '员工',
      renderType: 'popover',
      url: 'getStaffList',
      type: 'userName',
    },
    {
      itemName: 'date',
      initVal: '请选择记录时间',
      labelTxt: '记录生成时间',
      renderType: 'date',
    },
  ],
  [
    {
      itemName: 'reason',
      initVal: '请选择奖惩原因',
      labelTxt: '奖惩原因',
      renderType: 'input',
    },
    {
      itemName: 'type',
      initVal: '请选择奖惩类型',
      labelTxt: '奖惩类型',
      optionName: 'rewardType',
      renderType: 'select',
    },
  ],
  [
    {
      itemName: 'recordDesc',
      initVal: '请输入详细描述情况',
      labelTxt: '奖惩详细描述',
      renderType: 'input',
    },
    {
      labelTxt: '附件上传',
      type: 'upload',
      renderType: 'upload',
      itemName: 'file',
    },
  ],
];
