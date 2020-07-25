import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
   state = {
      title: 'ToDo./Mi🍺',
      version: '1.0',
   };
   render() {
      const { title, version } = this.state;
      return <Template title={title} version={version} />;
   }
}

const Template = ({ title, version }) => {
   return (
      <header className={'header'}>
         <Link to={'/'} className={'header__logo logo'}>
            <h1 className="">{title}</h1>
         </Link>
         <Link className="header__link link" to={`/releases-info/${version}`}>
            v{version}
         </Link>
      </header>
   );
};

Template.propTypes = {
   title: PropTypes.string.isRequired,
   version: PropTypes.string.isRequired,
};
