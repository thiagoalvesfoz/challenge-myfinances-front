import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';

import UsuarioService from '../app/service/usuarioService';
import { showSuccessMessage, showErrorMessage } from '../components/toastr'
import {Button} from 'primereact/button';

class CadastroUsuario extends React.Component {

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  state = {
    nome: '',
    email: '',
    senha: '',
    senhaRepeticao: ''
  }

  cadastrar = () => {

    const { nome, email, senha, senhaRepeticao } = this.state;
    const usuario = { nome, email, senha, senhaRepeticao };

    try{
      this.service.validar(usuario);
    } catch(err) {
      const erros = err.mensagens;
      erros.forEach( msg => showErrorMessage(msg) );
      return
    }
    
    this.service
      .cadastrarUsuario(usuario).then((response) => {
        showSuccessMessage("Usuário cadastrado com sucesso! Faça o login para acessar o sistema.")
        this.props.history.push('/login')
      }).catch(err => {
        showErrorMessage(err.response.data)
      });
  }

  login = () => {
    this.props.history.push('/login')
  }

  render() {
    return (
        <Card title="Cadastro de Usuário">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <FormGroup htmlForm="inputNome" label="Nome: *">
                  <input  type="text"  
                          className="form-control" 
                          id="inputNome" 
                          placeholder="Digite seu nome"
                          onChange={e => this.setState({nome: e.target.value})} />
                </FormGroup>
                <FormGroup htmlFor="inputEmail" label="Email: *">
                  <input  type="email" 
                          className="form-control" 
                          id="inputEmail" 
                          placeholder="Digite o Email"
                          onChange={e => this.setState({email: e.target.value})} />
                </FormGroup>
                <FormGroup htmlFor="inputSenha" label="Senha: *">
                  <input  type="password" 
                          className="form-control" 
                          id="inputSenha" 
                          placeholder="Password"
                          onChange={e => this.setState({senha: e.target.value})} />
                </FormGroup>
                <FormGroup htmlFor="inputRepitaSenha" label="Repita a Senha: *">
                  <input  type="password" 
                          className="form-control" 
                          id="inputRepitaSenha" 
                          placeholder="Password"
                          onChange={e => this.setState({senhaRepeticao: e.target.value})} />
                </FormGroup>
                <Button label="Cadastrar" 
                        icon="pi pi-user-plus"
                        className="mr p-button-success"
                        onClick={this.cadastrar} />
                <Button label="Login" 
                        icon="pi pi-sign-in" 
                        className="mr p-button-secondary"
                        onClick={this.login} />
              </div>
            </div>
          </div>
        </Card>
    )
  }
}

export default withRouter( CadastroUsuario )