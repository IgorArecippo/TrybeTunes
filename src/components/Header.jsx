import React from 'react';
// import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    userName: '',
    isLoading: true,
  };

  // componentDidMount() {
  //   const user = getUser();
  //   this.setState({
  //     isLoading: false,
  //   });
  //   console.log(user);
  // }

  recuperaNome = async () => {
    const func = await getUser();
    this.setState({
      isLoading: false,
      userName: func.name,
    });
    return func;
  };

  render() {
    const { userName, isLoading } = this.state;
    this.recuperaNome();
    return (
      <header data-testid="header-component">
        {
          isLoading ? <Loading /> : <div data-testid="header-user-name">{ userName }</div>
        }
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Músicas favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Meu perfil</Link>
      </header>
    );
  }
}

export default Header;

// Header.propTypes = {
//   getUser: Proptypes.func.isRequired,
// };
