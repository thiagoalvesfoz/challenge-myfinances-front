import React from 'react';

import UsuarioService from '../app/service/usuarioService';
import currencyFormatter from 'currency-formatter'
import {Button} from 'primereact/button';

import { AuthContext } from '../main/ProvedorDeAutentificacao'

import './home.css';

class Home extends React.Component {

  constructor() {
    super();
    this.apiService = new UsuarioService();
  }

  state = {
    user: '',
    saldo: 0,
    saldoClass: ''
  }

  componentDidMount() {
    const user = this.context.usuarioAutenticado;
    
    this.setState({user: user.nome})
    this.apiService.obterSaldoUsuario(user.id).then( response => {
        this.setState({saldo: response.data})
      }).catch( error => {
        console.log(error); 
      });
  }

  cadastrarLancamentos = () => {
    this.props.history.push('/cadastro-lancamento');
  }

  verLancamentos = () => {
    this.props.history.push('/consulta-lancamento');
  }

  primeiroNome = () => {
    const primeiroNome = this.state.user.split(' ').shift();
    return primeiroNome.toUpperCase().charAt(0).concat(primeiroNome.slice(1));
  }

  render(){

    const saldo = this.state.saldo > 0 ? 'saldo positivo' : 'saldo negativo';
        
    return (
      <div className="jumbotron" id="dark-1">
        <h1 className="display-3">
          Bem Vindo {this.primeiroNome()}!
        </h1>
        <p className="lead">
          Essa é a sua área administrativa. <br/>
          Veja o seu saldo atual
        </p>
        <p className={saldo}>
          {currencyFormatter.format(this.state.saldo, {locale: 'pt-BR'})}
        </p>
        <hr className="lead"/>
        <p className="lead">
          <Button label="Novo Lançamento" 
                  icon="pi pi-plus" 
                  className="mr p-button-success" 
                  onClick={this.cadastrarLancamentos} />

           <Button label="Ver Lançamentos" 
                  icon="pi pi-caret-right" 
                  className="mr p-button-secondary" 
                  onClick={this.verLancamentos} />
        </p>
      </div>
    )
  }
}

Home.contextType = AuthContext;

export default Home;