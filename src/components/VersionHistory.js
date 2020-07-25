import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLink, AiFillCheckSquare } from 'react-icons/ai';
import moment from 'moment';
import Clipboard from 'clipboard';
const VersionHistory = (props) => {
   const { update, children } = props;
   const { version, date, details, features } = update ? update : {};
   return (
      <>
         {update && (
            <Template version={version} date={date} details={details} features={features} children={children} {...props} />
         )}
      </>
   );
};
class Template extends React.Component {
   componentDidMount() {
      this.clipboard = new Clipboard('#copy', {
         text: () => `${window.location.href}`,
      });
   }
   render() {
      const { version, date, details, features, children } = this.props;
      return (
         <div className={'version-history-wrapper'}>
            <div className={'version-history-header'}>
               <div className={'version-history-sub-header'}>
                  <h2 className={'version-history-title'}>v{version}</h2>
                  {children && children.link && <AiOutlineLink className={'version-history-copy-icon'} id={'copy'} />}
               </div>
               <span className={'version-history-date'}>{moment(date * 1000).format('MMM Do, YYYY')}</span>
            </div>
            <div>
               <p className={'version-history-details'}>{details}</p>
               <div>
                  {features.map((feature) => (
                     <ul className={'features-list'} key={feature.type.id}>
                        <span className={`features-list-title features-list-title--${feature.type.text}`}>
                           {feature.type.text}
                        </span>
                        {feature.list.map((item) => (
                           <li className={'features-item'} key={item}>
                              <AiFillCheckSquare className={'feature-item-icon'} />
                              <p className={'features-item-text'}>{item}</p>
                           </li>
                        ))}
                     </ul>
                  ))}
               </div>
            </div>
         </div>
      );
   }
}
export default VersionHistory;
