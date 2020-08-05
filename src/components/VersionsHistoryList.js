import React from 'react';
import { Link } from 'react-router-dom';
import VersionHistory from './VersionHistory';
import vhContext, { VhConsumer } from '../contexts/versionHistory';
import useSort from './Sort';
import Sort from './Sort';
import moment from 'moment';

const VersionsHistoryList = (props) => {
   const { match } = props;
   const { updateLogs } = React.useContext(vhContext);
   const sortedUpdateLogs = useSort({
      array: updateLogs,
      order: 'za',
      sortBy: 'date',
      nested: true,
   });
   return (
      <>
         <h3 className={'releases-info-title'}>All Updates</h3>
         <ul className={'releases-info-list'}>
            {sortedUpdateLogs.map((update) => {
               return (
                  <li className={'releases-info-item'} key={update.version}>
                     <Link className={'releases-info-link'} to={`${match.url}/${update.version}`}>
                        <VersionHistory update={update} />
                     </Link>
                  </li>
               );
            })}
         </ul>
      </>
   );
};
export default VersionsHistoryList;
/*console.log(moment().unix());*/
// add anchor for copy specific update in card (use some third party lib for copy to clipboard by clicking), => done
// separate copy feature to hoc or render prop component to use every where
// showing only in one place
// react awesome form validator
// use url parameter somehow
// lazy loading => done
// axios
// styled component
// improve style in header (for links)
// improve style in add todos (use flexBox for sizing)
// improve style (component base)
// improve style (responsive and relative font sizing)
// show error when nothing to show in body => done
// add scroll
// add road map to version history
// change check icon in todoList to square border and then when finish to check mark icon
// update todoList.js for adding state to component and reRender based on the state on changing url AND edit index.js for switching urls by params

// search
// tooltip
// scroll
