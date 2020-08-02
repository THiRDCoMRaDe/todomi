const objPathResolver = (path, obj) => {
   return path.split('.').reduce((acc, cur) => (acc ? acc[cur] : null), obj);
};
export default objPathResolver;
