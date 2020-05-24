import React from 'react';
import currencyFormatter from 'currency-formatter';

import {Button} from 'primereact/button';
import './lancamento.css'

export default (props) => {

  const rows = props.lancamentos.map( (lancamento, index ) => {
    return (
      <tr key={index} id="table-dark">
        <td data-label="Descrição" >{lancamento.descricao}</td>
        <td data-label="Valor" >{ currencyFormatter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
        <td data-label="Tipo" >{lancamento.tipo}</td>
        <td data-label="Mês" >{lancamento.mes}</td>
        <td data-label="Situação" >{lancamento.status}</td>
        <td>
          <Button label="Finalizar" 
                  icon="pi pi-check" 
                  className="mr p-button-success"
                  disabled={ lancamento.status !== 'PENDENTE' }
                  onClick={ e => props.alterarStatus(lancamento, 'EFETIVADO')} />

          <Button label="Cancelar" 
                  icon="pi pi-times" 
                  className="mr p-button-danger" 
                  disabled={ lancamento.status !== 'PENDENTE' }
                  onClick={ e => props.alterarStatus(lancamento, 'CANCELADO')} />
          <div className="aux">
            <Button label="" 
                    icon="pi pi-pencil" 
                    className=" mr p-button-secondary" 
                    disabled={ lancamento.status !== 'PENDENTE' }
                    onClick={ e => { props.editAction(lancamento.id) }} />

            <Button label="" 
                    icon="option pi pi-trash" 
                    className="mr p-button-secondary" 
                    onClick={ e => { props.deleteAction(lancamento) }} />
          </div>
        </td>
      </tr>
    )
  });
  return(
    <>
    <table className="table table-hover">
      <thead>
        <tr className="table-primary">
          <th scope="col">Descrição</th>
          <th scope="col">Valor</th>
          <th scope="col">Tipo</th>
          <th scope="col">Mês</th>
          <th scope="col">Situação</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
    </>
  )
}