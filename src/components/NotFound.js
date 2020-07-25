import React from 'react';
const NotFound = (props) => {
   const from = props.location.state ? props.location.state.from.pathname.substr(1) : null;
   return from ? (
      <div>
         <h2>
            you trying to reach out
            <code>"/{from}"</code>
            <br /> but its not found! <strong>😭</strong>
         </h2>
      </div>
   ) : (
      <div>
         <h2>404</h2>
      </div>
   );
};
export default NotFound;
