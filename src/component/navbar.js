import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { SidebarData } from '../services/sidebarData';

function NavBar() {
  const [sidebar, setSidebar] = useState(false);
  const showSideBar = () => setSidebar(!sidebar);
  return (
    <IconContext.Provider value={ { color: '#fff' } }>
      <div className="navbar">
        <div className="col-5">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={ showSideBar } />
          </Link>
        </div>
        <div className="col 4">
          <h3 className="text-light">ServeRest</h3>
        </div>
      </div>
      <nav className={ sidebar ? 'nav-menu active' : 'nav-menu' }>
        <div className="nav-menu-itens " onClick={ showSideBar }>
          <div className="navbar-toggle">
            <div>
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </div>
            <div className="nome-navbar text-light right">Menu</div>
          </div>
          { SidebarData.map((item, index) => (
            <div key={ index } className={ item.cName }>
              <Link to={ item.path }>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </div>
          ))}
        </div>
        <div />
      </nav>
    </IconContext.Provider>
  );
}

export default NavBar;
