import React from 'react';
import PropTypes from 'prop-types';
const NotFound = ({ location }) => {
   const from = location.state ? location.state.from.pathname.substr(1) : null;
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
NotFound.propTypes = {
   location: PropTypes.object.isRequired,
};
export default NotFound;
