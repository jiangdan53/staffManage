// @ts-nocheck
import { Tag, Image } from 'antd';
import { formatYear, formatDate, formatBirth } from 'utils/format';
import { mapData } from 'utils/mapData';
import loadErrorImg from 'common/img/load_error.png';
import { staffRule } from 'utils/rules';
import iconMap from 'components/IconMap';

const Columns = ({
  handleSave,
  userInfo,
  openReviewRecord,
  openDetailDialog,
}) => {
  //- 正常渲染的字段
  const normalList = [
    {
      title: '姓名',
      dataIndex: 'userName',
      editable: true,
      render: (userName, { _id }) => {
        return (
          <>
            <span className="user-name">{userName}</span>
            {userInfo.identity === 1 && (
              <span
                className="c-r"
                onClick={(e) => {
                  e.stopPropagation();
                  openDetailDialog(_id);
                }}
              >
                {iconMap.detail}
              </span>
            )}
          </>
        );
      },
    },
    {
      title: '联系电话',
      editable: true,
      dataIndex: 'mobile',
    },
    {
      title: '职级描述',
      dataIndex: 'level',
      render: (data) => data?.levelDescription || '暂无职级描述',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      editable: true,
      render: (type) => <Tag>{mapData.gender[type]}</Tag>,
    },
    {
      title: '部门',
      dataIndex: 'department',
      render: (data) => data?.departmentName || '---',
    },
    {
      title: '部门负责人',
      dataIndex: 'department',
      render: (data) => data?.departmentLeader?.userName || '---',
    },
  ];
  //- 只有管理员可以进行渲染展示
  const authList = [
    {
      title: '入职时间',
      dataIndex: 'onboardingTime',
      editable: true,
      render: (date) => formatDate(date, 'YYYY-MM-DD'),
    },
    {
      title: '年龄',
      dataIndex: 'idNumber',
      render: (idNumber) => formatYear(idNumber, 'age'),
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: (img) => <Image src={img || 'error'} fallback={loadErrorImg} />,
    },
    {
      title: '籍贯',
      editable: true,
      dataIndex: 'hometown',
      render: (hometown) => hometown || '---',
    },
    {
      title: '学历',
      editable: true,
      dataIndex: 'education',
      render: (type) => <Tag> {mapData['education'][type]}</Tag>,
    },
    {
      title: '婚姻状况',
      editable: true,
      dataIndex: 'marriage',
      render: (type) => <Tag> {mapData['marriage'][type]}</Tag>,
    },
    {
      title: '生日',
      dataIndex: 'idNumber',
      render: (id) => formatBirth(id),
    },
    {
      title: '银行卡',
      dataIndex: 'bankNumber',
      editable: true,
    },
    {
      title: '身份证号',
      editable: true,
      dataIndex: 'idNumber',
    },
    {
      title: '毕业院校',
      editable: true,
      dataIndex: 'graduatedSchool',
    },
    {
      title: '绩效考核',
      dataIndex: 'record',
      render: (record, data) => {
        return (
          <Tag
            onClick={() =>
              openReviewRecord({
                title: '考核记录',
                interfaceName: 'getAssessmentList',
                requestData: {
                  queryData: { staffName: data._id },
                },
                type: 'assessment',
              })
            }
            className="c-p"
          >
            查看
          </Tag>
        );
      },
    },
    {
      title: '奖惩记录',
      dataIndex: 'record',
      render: (record, data) => {
        return (
          <Tag
            onClick={() =>
              openReviewRecord({
                title: '奖惩记录',
                interfaceName: 'getRewardAndPunishment',
                requestData: {
                  staffName: data._id,
                },
                type: 'reward',
              })
            }
            className="c-p"
          >
            查看
          </Tag>
        );
      },
    },
    {
      title: '调薪记录',
      dataIndex: 'record',
      render: (record, data) => {
        return (
          <Tag
            onClick={() =>
              openReviewRecord({
                title: '调薪记录',
                interfaceName: 'getSalaryAdjustment',
                requestData: {
                  staffName: data._id,
                },
                type: 'salary',
              })
            }
            className="c-p"
          >
            查看
          </Tag>
        );
      },
    },
  ];

  let renderColumnsList =
    userInfo.identity === 0 ? normalList : [...normalList, ...authList];

  renderColumnsList = renderColumnsList.map((col) => {
    if (!col.editable || userInfo.identity === 0) {
      return col; //- 直接返回当前的渲染单元格
    }
    //- 当前的单元格为可编辑的单元格
    return {
      ...col,
      onCell: (record) => {
        //- 创建一个规定编辑表单类型的属性type
        let type = '';

        switch (col.dataIndex) {
          case 'onboardingTime':
            type = 'dateNode';
            break;
          case 'gender':
          case 'education':
          case 'marriage':
            type = 'selectNode';
            break;
          default:
            type = 'inputNode';
            break;
        }
        return {
          record,
          type,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          rules: staffRule[col.dataIndex],
          handleSave: handleSave,
        };
      },
    };
  });

  return renderColumnsList;
};

export default Columns;
