import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { getUser } = this.props;
    return (
      <header data-testid="header-component">
        <p>{ getUser }</p>
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Músicas favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Meu perfil</Link>
      </header>
    );
  }
}

export default Header;

Header.propTypes = {
  getUser: Proptypes.func.isRequired,
};
