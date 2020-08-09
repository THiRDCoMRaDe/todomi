import React from 'react';
import objPathResolver from '../helpers/objPathResolver';
const useSort = ({ array, sortBy = 'id', order = 'az', nested = true }) => {
   const [sortedList, setSortedList] = React.useState([]);
   React.useEffect(() => {
      setSortedList(() => {
         switch (order) {
            case 'az':
               return nested
                  ? array.sort((a, b) => objPathResolver(sortBy, b) > objPathResolver(sortBy, a) && -1)
                  : array.sort((a, b) => b > a && -1);
            case 'za':
               return nested
                  ? array.sort((a, b) => objPathResolver(sortBy, b) < objPathResolver(sortBy, a) && -1)
                  : array.sort((a, b) => b < a && -1);
            default:
               return null;
         }
      });
   }, [array]);
   return sortedList;
};
export default useSort;
