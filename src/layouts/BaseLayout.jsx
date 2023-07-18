// @ts-nocheck
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;
import './BaseLayout.less';
import SideBar from '../components/SideBar';
import CommonHeader from '../components/CommonHeader';
import { history, useSelector, useDispatch } from 'umi';
import NotFoundPage from '../pages/404Page';
import Loading from 'components/Loading';
import 'common/css/main.less';

const BaseLayout = ({ children }) => {
  // 这个属性得到的是一个boolean 表示当前展示的侧边栏是否是纯图标 或者图标带文字
  const { collapse } = useSelector((state) => state.common);
  const { location } = history;
  // 从本地储存拿到到侧边栏的数组 渲染到页面 减少http请求
  const routeList = JSON.parse(sessionStorage.getItem('routeList'));
  // 从umi自带的dva-loading状态模块拿到数据 来控制是否需要展示加载组件
  const loading = useSelector((state) =>{
    return state.loading} );
     // 得到dva触发异步改便状态数据的函数 
  const dispatch = useDispatch();

  //- 定义一个当前界面的判断函数，第一判断当前界面是不是根域下，直接跳转到路由对象的首页面，如果说当前访问的界面没有在路由表内部，直接跳转到404界面
  const isIncludesPage = () => {
    if (location.pathname === '/') {
      //- 路由表根据权限返回，返回路由表的第一项内容
      history.replace(routeList[0].route);
      return false;
    }
    // array数组中的some方法需要传入一个函数 我们传入的这个函数会接收一个参数 这个参数为数组中的每一项
    // 当数组中有任意一项满足当前函数内的判断时就会返回true 否者返回false
    return routeList.some((item) => item.route === location.pathname); // 返回值为boolean
  };

  // //- 改变侧边栏的宽度展示
  const changeCollapse = () => {
    dispatch({
      type: 'common/changeCollapse',
      payload: { collapse: !collapse },
    });
  };
  return (
    <Layout className="container"> 
      {/* 侧边栏 */}
      <SideBar Sider={Sider} Menu={Menu} collapse={collapse} />
      <Layout>
        {/* 头部展示区 */}
        <CommonHeader
          Header={Header}
          collapse={collapse}
          changeCollapse={changeCollapse}
        />
         {/* 内容区 */}
        <Content className="main-content">
          {isIncludesPage() ? (
            <>
              <Loading
                part={true}
                isShow={
                  loading.effects['dashboard/initDashboardList'] ||
                  loading.effects['attendance/initAttendanceList']
                }
              />
              {children}
            </>
          ) : (
            <NotFoundPage />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
