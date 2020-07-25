import React from 'react';
import { NavLink } from 'react-router-dom';

const TodoNav = () => {
   return (
      <nav className={'navigation'}>
         <ul className={'navigation__list'}>
            <li className={'navigation__item'}>
               <NavLink className={'navigation__link'} activeClassName={'navigation__link--active'} exact to={'/'}>
                  all
               </NavLink>
            </li>
            <li className={'navigation__item'}>
               <NavLink className={'navigation__link'} activeClassName={'navigation__link--active'} to={'/incomplete'}>
                  Incomplete
               </NavLink>
            </li>
            <li className={'navigation__item'}>
               <NavLink className={'navigation__link'} activeClassName={'navigation__link--active'} to={'/completed'}>
                  Completed
               </NavLink>
            </li>
         </ul>
      </nav>
   );
};

export default TodoNav;
