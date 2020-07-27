import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import Search from './Search';
import clearStorage from '../helpers/clearStorage';
window.addEventListener('load', clearStorage('showSearch'));
class TodoNav extends React.Component {
   state = {
      showSearch: false,
   };
   toggleSearch = () => {
      this.setState(
         {
            showSearch: !this.state.showSearch,
         },
         () => {
            localStorage.setItem('showSearch', this.state.showSearch);
         }
      );
   };
   componentDidMount() {
      this.setState({
         showSearch: localStorage.getItem('showSearch') === 'true',
      });
   }

   render() {
      const { showSearch } = this.state;

      return (
         <nav className={'navigation'}>
            <div className="row">
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
               <div className={`search-btn search-btn--${showSearch ? 'open' : 'close'}`} onClick={this.toggleSearch}>
                  <span className={'search-btn__text'}>search</span>
                  {showSearch ? (
                     <AiOutlineCaretUp className={'search-btn__icon search-btn__icon--up'} />
                  ) : (
                     <AiOutlineCaretDown className={'search-btn__icon search-btn__icon--down'} />
                  )}
               </div>
            </div>
            {showSearch && (
               <div className="row row--search">
                  <div className="search-box">
                     <Search />
                  </div>
               </div>
            )}
         </nav>
      );
   }
}

export default TodoNav;
