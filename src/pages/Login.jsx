import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    userName: '',
    isLoading: false,
    isCreated: false,
  };

  validaBotao = () => {
    const { userName } = this.state;
    const tres = 3;

    if (userName.length >= tres) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.validaBotao());
  };

  validaSave = () => {
    const { userName } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      await createUser({ name: userName });
      this.setState({
        isLoading: false,
        isCreated: true,
      });
    });
  };

  render() {
    const { isButtonDisabled, userName, isLoading, isCreated } = this.state;
    return (
      <div data-testid="page-login">
        Nome:
        <input
          data-testid="login-name-input"
          type="text"
          name="userName"
          value={ userName }
          onChange={ this.onInputChange }
        />
        <button
          type="button"
          name="botao-de-entrar"
          data-testid="login-submit-button"
          disabled={ isButtonDisabled }
          onChange={ this.onInputChange }
          onClick={ this.validaSave }
        >
          Entrar
        </button>
        {
          (isLoading && <Loading />) && (isCreated && <Redirect to="/search" />)
        }
      </div>
    );
  }
}

export default Login;
