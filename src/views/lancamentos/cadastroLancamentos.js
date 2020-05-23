import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import * as messages from '../../components/toastr';
import AuthService from '../../app/service/auth'

import LancamentoService from '../../app/service/lancamentoService';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {InputNumber} from 'primereact/inputnumber';

class CadastroLançamento extends React.Component {

  constructor(){
    super();
    this.service = new LancamentoService();
  }

  state = {
    id: null,
    tipo: '',
    mes: '',
    valor: 0,
    ano: new Date().getFullYear(),
    descricao: '',
    status: '',
    usuario: '',
    atualizando: false
  }

  componentDidMount() {

    const params = this.props.match.params

    if(params.id){
      this.service.getById(params.id).then(response => {
        this.setState({...response.data, atualizando: true})
      }).catch(err => {
        messages.showErrorMessage(err.response.data);
      })
    }
  }

  cancelar = () => {
    this.props.history.push('/consulta-lancamento')
  }

   submit = () =>  {
 
    const user =  AuthService.getUserAuth();
    const { descricao, mes, ano, valor, tipo } = this.state
    const lancamento = { descricao, mes, ano, valor, tipo, usuario: user.id }

    try{      
        this.service.validateFields(lancamento);
    } catch(err) {       
        const erros = err.mensagens
        erros.forEach(msg => messages.showErrorMessage(msg))
        return;
    }  

    this.service.salvar(lancamento).then( response => {
      this.props.history.push('/consulta-lancamento')
      messages.showSuccessMessage('Lançamento cadastrado com sucesso.')
    }).catch(err => {
      messages.showErrorMessage(err.response.data)
      console.log(err)
    })
  }

  atualizar = () => {   
    
    const { descricao, mes, ano, valor, tipo, id, usuario, status } = this.state
    const lancamento = { descricao, mes, ano, valor, tipo, id, usuario, status }
    
    this.service.atualizar(lancamento).then( response => {
      this.props.history.push('/consulta-lancamento')
      messages.showSuccessMessage('Lançamento atualizado com sucesso.')
    }).catch(err => {
      messages.showErrorMessage(err.response.data)
    })

  }


  handleChange = (event) => {
    //criando um método genérico em javascript
    const value = event.target.value;
    const name = event.target.name;
    
    this.setState({ [name] : value }) //interpolação
  }

  eventSubmit = () => {
    if(this.state.id)
      this.atualizar();
    else
      this.submit();
  }

  render() {

    const tipo = this.service.getTypeLaunch();
    const meses = this.service.getMonths();
    const pageStatus = this.state.atualizando ? "Atualizar Lançamento" : "Cadastrar Lançamento";

    return(
      <Card title={ pageStatus } >
        <div className="row">
          <div className="col-md-12">
            <FormGroup htmlFor="inputDescricao" label="Descrição: *">
              <input  id="inputDescricao" 
                      type="text" 
                      className="form-control"
                      name="descricao" 
                      placeholder="Digite uma descrição para o lançamento"
                      value={this.state.descricao}
                      onChange={ this.handleChange }/>
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormGroup htmlFor="inputAno" label="Ano: *">
              <InputNumber  value={this.state.ano} 
                            name="ano"
                            onChange={ this.handleChange } 
                            className="large" 
                            mode="decimal" 
                            max={9999} 
                            useGrouping={false} />
            </FormGroup>
          </div>

          <div className="col-md-6">
            <FormGroup htmlFor="inputMes" label="Mês: *">
              <Dropdown value={this.state.mes } 
                        name="mes"
                        options={ meses } 
                        className="large"
                        onChange={ this.handleChange }
                        placeholder="Mês"/>
          </FormGroup>
        </div>

      </div>

        <div className="row">

          <div className="col-md-4">
            <FormGroup htmlFor="inputValor" label="Valor: *">
              <InputNumber  value={this.state.valor} 
                            name="valor"
                            onChange={ this.handleChange } 
                            className="large" 
                            mode="currency" 
                            currency="BRL"
                            max={9999999999} 
                            locale="pt-BR" />
            </FormGroup>
          </div>

          <div className="col-md-4">
            <FormGroup htmlFor="inputTipo" label="Tipo: *">
              <Dropdown value={ this.state.tipo } 
                        options={ tipo } 
                        className="large"
                        name="tipo"
                        onChange={ this.handleChange }
                        placeholder="tipo" />
            </FormGroup>

          </div>

          <div className="col-md-4">
            <FormGroup htmlFor="inputStatus" label="Status:">
              <input  type="text" 
                      id="inputStatus"
                      className="form-control" 
                      value={this.state.status} 
                      disabled/>
            </FormGroup>
          </div>

        </div>

        <div className="row">
          <div className="col-md-6">
            {
              this.state.atualizando ?
                  (<Button onClick={ this.atualizar } label="Atualizar" icon="pi pi-caret-up" className="mr p-button-info" />) 
                : (<Button onClick={ this.submit } label="Salvar" icon="pi pi-check" className="mr p-button-info" /> )
            }
            <Button onClick={ this.cancelar } label="Cancelar" icon="pi pi-times" className="mr p-button-secondary" />
          </div>          
        </div>
      </Card>
    )
  }

}

export default withRouter(CadastroLançamento);