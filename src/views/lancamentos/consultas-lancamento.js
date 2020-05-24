import React from 'react';
import { withRouter } from 'react-router-dom'
import LancamentoService from '../../app/service/lancamentoService'
import AuthService from '../../app/service/auth'

import { showErrorMessage, showSuccessMessage } from '../../components/toastr' 
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import TableLancamentos from './lancamentosTable'
import {InputNumber} from 'primereact/inputnumber';

// prime react
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';

import './lancamento.css'

class ConsultaLancamento extends React.Component {

  constructor(){
    super()
    this.service = new LancamentoService();
  }

  state = {
    ano: null,
    mes: '',
    descricao: '',
    tipoLancamento: '',
    lancamentos: [],
    showConfirmDialog: false,
    lancamentoDeletar: {},
    listNotFound: 'Nada para mostrar'
  };

  componentDidMount(){    
    this.setState({ ano : new Date().getFullYear() });
    this.buscar();
  }

  cadastrar = () => {
    this.props.history.push('/cadastro-lancamento')
  }

  editar = (id) => {
    this.props.history.push(`/cadastro-lancamento/${id}`)
  }

  buscar = () => {

    const user = AuthService.getUserAuth();

    const filtro = {
      usuario: user.id,
      ano: this.state.ano,
      mes: this.state.mes,
      tipoLancamento: this.state.tipoLancamento,
      descricao: this.state.descricao
    }

    this.service.consultar(filtro).then(response => {    
      this.setState({ lancamentos: response.data, 
                      listNotFound: response.data < 1 ? 
                      'Nenhum resultado encontrado.' 
                      : '' });     
    }).catch(err => {
      showErrorMessage(err.response.data)
    })

  }

  deletar = () => {

    const id = this.state.lancamentoDeletar.id;

    this.service
      .deleteById(id).then( () => {        

        const lancamentos = this.state.lancamentos;        
        const index = lancamentos.indexOf(this.state.lancamentoDeletar);        
        lancamentos.splice(index, 1);
       
        this.setState({lancamentos: lancamentos, showConfirmDialog: false});        
        showSuccessMessage('Lançamento deletado com sucesso');

    }).catch(err => {
      showErrorMessage(err.response.data);
    })
  }


  alterarStatus = (lancamento, status) => {
    this.service
      .alterarStatus(lancamento.id, status)
      .then( response => { 
        
        const lancamentos  = this.state.lancamentos;
        const index = lancamentos.indexOf(lancamento);
        
        if(index !== -1) {
          lancamento['status'] = status;
          lancamentos[index] = lancamento;
          this.setState({ lancamentos }) 
        }

        showSuccessMessage('Status atualizado com sucesso!') 
      }).catch( err => {
        showErrorMessage(err.response.data)
      })
  }


  confirmarExclusao = (lancamento) => {
    this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
  }

  cancelarExclusao = () => {
    this.setState({ showConfirmDialog: false, lancamentoDeletar: { } })
  }

  render() {

    const meses = this.service.getMonths()
    const tipo = this.service.getTypeLaunch();

    const confirmDialogFooter = (
      <div class="btn-dialog">
        <Button label="Confirmar" 
                icon="pi pi-check" 
                className="p-button-danger"
                onClick={this.deletar} />
        
        <Button label="Cancelar" 
                icon="pi pi-times" 
                className="p-button-secondary" 
                onClick={this.cancelarExclusao} />
      </div>
    )

    return (     
      <Card title="Consulta Lançamento">
        <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
            <FormGroup label="Descrição: " htmlFor="inputAno" >
                <input  type="text" 
                        className="form-control" 
                        id="inputDescricao" 
                        placeholder="Digite a descrição do Lançamento"
                        onChange={ field => this.setState({descricao: field.target.value})} />
              </FormGroup>
              <FormGroup label="Ano: *" htmlFor="inputAno" >
                <InputNumber  className="large" 
                              mode="decimal" 
                              max={9999}                              
                              value={ this.state.ano }
                              useGrouping={false}
                              onChange={ (e) => this.setState({ano: e.target.value})} />                
              </FormGroup>

              <FormGroup label="Mês: *" htmlFor="inputMes">
                <Dropdown value={this.state.mes } 
                          options={ meses } 
                          className="large"
                          onChange={ select => this.setState({mes: select.target.value}) }
                          placeholder="Selecione o Mês"/>
              </FormGroup>

              <FormGroup label="Tipo de Lançamento: *" htmlFor="inputLancamento">
              <Dropdown value={this.state.tipoLancamento} 
                        options={tipo} 
                        className="large"
                        onChange={ select => this.setState({tipoLancamento: select.target.value}) }
                        placeholder="Selecione o tipo de lançamento" />
              </FormGroup>
              <Button label="Pesquisar" 
                icon="pi pi-search" 
                className="mr p-button-success" 
                onClick={ this.buscar } />
                
              <Button label="Adicionar" 
                icon="pi pi-plus" 
                className="mr p-button-secondary" 
                onClick={ this.cadastrar } />
            </div> 
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <TableLancamentos lancamentos={ this.state.lancamentos }
                                deleteAction={ this.confirmarExclusao }
                                editAction={ this.editar } 
                                alterarStatus={ this.alterarStatus } />
              { this.state.listNotFound }
            </div>
          </div>
          <div>
            <Dialog header={`Deletar ${this.state.lancamentoDeletar.descricao}` }
                    visible={ this.state.showConfirmDialog } 
                    style={ { width: '50vw' } } 
                    modal={ true } 
                    footer={ confirmDialogFooter }
                    onHide={ this.cancelarExclusao } >
                    Confirma a exclusão desse lançamento?
            </Dialog>
          </div>
        </div>
      </Card>
    )
  }

}

export default withRouter( ConsultaLancamento );

