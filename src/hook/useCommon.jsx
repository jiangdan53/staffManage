import React, { useRef } from 'react';
// 自定义翻页数量的hooks 
const useCommon = () => {
  const page = useRef(1);

  const setPage = (currentPage) => {
    page.current = currentPage;
    return page; //- 保证setPage有返回值，并且为true
  };
  return [page, setPage];
};

export default useCommon;
