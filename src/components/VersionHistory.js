import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import throttle from '../helpers/throttle';
import { AiOutlineLink, AiFillCheckSquare } from 'react-icons/ai';
import moment from 'moment';
import Clipboard from 'clipboard';
import { ToastContainer, toast } from 'react-toastify';

const Template = (props) => {
   const { version, date, details, features, children, clipboardIdSelector } = props;
   const notify = () =>
      toast('Link copied to clipboard!', {
         position: 'bottom-center',
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
      });
   return (
      <div className={'version-history-wrapper'}>
         <div className={'version-history-header'}>
            <div className={'version-history-sub-header'}>
               <h2 className={'version-history-title'}>v{version}</h2>
               {children && children.link && (
                  <span>
                     <Tooltip text={'Click to copy address'}>
                        <AiOutlineLink
                           className={'version-history-copy-icon'}
                           onClick={(e) => {
                              e.persist();
                              let debouncedFn;
                              if (!debouncedFn) {
                                 debouncedFn = throttle(() => {
                                    notify();
                                 }, 2000);
                              }
                              debouncedFn();
                           }}
                           id={clipboardIdSelector}
                        />
                     </Tooltip>
                     <ToastContainer
                        position="bottom-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                     />
                  </span>
               )}
            </div>
            <span className={'version-history-date'}>{moment(date * 1000).format('MMM Do, YYYY')}</span>
         </div>
         <div>
            <p className={'version-history-details'}>{details}</p>
            <div>
               {features.map((feature) => (
                  <ul className={'features-list'} key={feature.type.id}>
                     <span className={`features-list-title features-list-title--${feature.type.text}`}>
                        {feature.type.text.toUpperCase()}
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
};

const VersionHistory = (props) => {
   const { update, children } = props;
   const { version, date, details, features } = update ? update : {};
   let clipboardIdSelector = 'copy';
   React.useEffect(() => {
      new Clipboard(`#${clipboardIdSelector}`, {
         text: () => `${window.location.href}`,
      });
   }, []);
   return (
      <>
         {update && (
            <Template
               clipboardIdSelector={clipboardIdSelector}
               version={version}
               date={date}
               details={details}
               features={features}
               children={children}
               {...props}
            />
         )}
      </>
   );
};

VersionHistory.propTypes = {
   update: PropTypes.object.isRequired,
   children: PropTypes.object,
};

export default VersionHistory;
