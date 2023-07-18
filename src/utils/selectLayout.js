 // 粗略估计 当前的方法作用时根据传入进来的数组判断当前数组中是否包含 /users 应该时路由路径数组
export const selectLayout = (pathName) => {
  return pathName.includes('/users') ? 'LoginLayout' : 'BaseLayout';
};
