import React from 'react';
import Hover from './Hover';
import useHover from './Hover';
const styles = {
   container: {
      position: 'relative',
      display: 'flex',
   },
   tooltip: {
      boxSizing: 'border-box',
      position: 'absolute',
      minWidth: '150px',
      bottom: '100%',
      left: '0',
      borderRadius: '3px',
      backgroundColor: 'rgba(256,256,256,.9)',
      padding: '7px',
      marginBottom: '5px',
      color: '#000',
      textAlign: 'center',
      fontSize: '12px',
   },
};
const Tooltip = ({ text, children }) => {
   const [hovering, attrs] = useHover();
   return (
      <div style={styles.container} {...attrs}>
         {hovering === true && <div style={styles.tooltip}>{text}</div>}
         {children}
      </div>
   );
};
export default Tooltip;
