import React from 'react';

/*gconst Hover = ({ children }) => {
   const [hovering, setHovering] = React.useState(false);
   const mouseOver = () => {
      setHovering(true);
   };
   const mouseOut = () => {
      setHovering(false);
   };
   return (
      <div onMouseOver={mouseOver} onMouseOut={mouseOut}>
         {children(hovering)}
      </div>
   );
};
export default Hover;*/

function useHover() {
   const [hovering, setHovering] = React.useState(false);
   const mouseOver = () => setHovering(true);
   const mouseOut = () => setHovering(false);
   const attrs = {
      onMouseOver: mouseOver,
      onMouseOut: mouseOut,
   };
   return [hovering, attrs];
}
export default useHover;
