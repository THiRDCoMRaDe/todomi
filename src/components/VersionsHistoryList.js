import React from 'react';
import { Link } from 'react-router-dom';
import VersionHistory from './VersionHistory';
import { VhConsumer } from '../contexts/versionHistory';

const VersionsHistoryList = (props) => {
   const { match } = props;
   return (
      <>
         <h3 className={'releases-info-title'}>All Updates</h3>
         <VhConsumer>
            {({ updateLogs }) => (
               <ul className={'releases-info-list'}>
                  {updateLogs.map((update) => (
                     <li className={'releases-info-item'} key={update.version}>
                        <Link className={'releases-info-link'} to={`${match.url}/${update.version}`}>
                           <VersionHistory update={update} />
                        </Link>
                     </li>
                  ))}
               </ul>
            )}
         </VhConsumer>
      </>
   );
};
export default VersionsHistoryList;

// add anchor for copy specific update in card (use some third party lib for copy to clipboard by clicking),
// separate copy feature to hoc or render prop component to use every where
// showing only in one place
// react awesome form validator
// use url parameter somehow
// lazy loading
// axios
// styled component
// improve style in header (for links)
// improve style in add todos (use flexBox for sizing)
// improve style (component base)
// improve style (responsive and relative font sizing)
// show error when nothing to show in body
// add scroll
// add road map to version history
// change check icon in todoList to square border and then when finish to check mark icon
// update todoList.js for adding state to component and reRender based on the state on changing url AND edit index.js for switching urls by params
