import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ToggleTheme from './ToggleTheme';
import { VhConsumer } from '../contexts/versionHistory';

export default class Header extends React.Component {
   state = {
      title: 'ToDo./Mi🍺',
   };
   render() {
      const { title, version } = this.state;
      return <Template title={title} />;
   }
}

const Template = ({ title }) => {
   return (
      <header className={'header'}>
         <div>
            <Link to={'/'} className={'header__logo logo'}>
               <h1 className="">{title}</h1>
            </Link>
            <VhConsumer>
               {({ updateLogs }) => {
                  const version = updateLogs[updateLogs.length - 1].version;
                  return (
                     <Link className="header__link link" to={`/releases-info/${version}`}>
                        v{version}
                     </Link>
                  );
               }}
            </VhConsumer>
         </div>
         <ToggleTheme />
      </header>
   );
};

Template.propTypes = {
   title: PropTypes.string.isRequired,
};
