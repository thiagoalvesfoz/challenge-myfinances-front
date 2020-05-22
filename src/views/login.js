import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

import UsuarioService from '../app/service/usuarioService';

import { showErrorMessage } from '../components/toastr';
import {Button} from 'primereact/button';

import { AuthContext } from '../main/ProvedorDeAutentificacao'

class Login extends React.Component {

  constructor(){
    super();
    this.apiService = new UsuarioService();

  }

  state = {
    email: '',
    senha: '',
  }

  //chama o método autenticar em UsuarioService passando um objeto
  entrar = () => {

    // if(!this.state.email || !this.state.senha){
    //   showErrorMessage('Preencha todos os campos');
    //   return false;
    // }

    this.apiService.autenticar({
      email: this.state.email, 
      senha: this.state.senha
    })
    .then( response => { 
      const user = response.data;
      this.context.iniciarSessao(user);
      this.props.history.push('/home');
    })
    .catch( erro => {
      showErrorMessage(erro.response.data);
    })
  }

  //caso o usuário clique em cadastrar esse método chama a página de cadastro
  prepareCadastrar = () => {
    this.props.history.push('/cadastro-usuarios');
  }

  render(){
    return (
      <div className="row">
        <div className="col-md-6" style={{position: 'relative', margin: 'auto'}}>
          <Card title="Login">
            <div className="row">
              <div className="col-lg-12">
                <div className="bs-componet">
                <fieldset>
                    <FormGroup htmlFor='exampleInputEmail1' label="E-mail: *"  >
                      <input type="email" value={this.setState.email} 
                            onChange={ event => this.setState({email: event.target.value})}
                            className="form-control" id="exampleInputEmail1" 
                            aria-describedby="emailHelp" placeholder="Digite o Email" />                            
                    </FormGroup>
                    <FormGroup htmlFor='exampleInputPassword1' label="Senha: *"  >
                      <input type="password" value={this.setState.senha}
                            onChange={ event => this.setState({senha: event.target.value}) }
                            className="form-control" id="exampleInputPassword1" 
                            placeholder="Password" />
                    </FormGroup>
                    <Button label="Login" 
                            icon="pi pi-sign-in" 
                            className="mr p-button-info"
                            onClick={this.entrar} />
                    <Button label="Cadastrar" 
                            icon="pi pi-user-plus" 
                            className="mr p-button-secondary"
                            onClick={this.prepareCadastrar} />
                  </fieldset>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
  )}

}

Login.contextType = AuthContext

export default withRouter( Login )
