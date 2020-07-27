const debounce = (fn, delay, callback) => {
   let timeoutTime;
   return function (...args) {
      if (timeoutTime) {
         clearTimeout(timeoutTime);
      }
      timeoutTime = setTimeout(() => {
         fn(...args);
      }, delay);
   };
};

export default debounce;
