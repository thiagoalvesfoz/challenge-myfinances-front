import React, { Component } from 'react';

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

class Alert extends Component {

  state = {
    visible: false
  }

  componentDidMount() {
    setTimeout( () => this.setState({visible: true}), 800)
  }

  render () {

    const confirmDialogFooter = (
      <div>
        <Button label="Ok, entendi" 
                icon="pi pi-check" 
                className="p-button-success"                
                onClick={ () => this.setState( { visible: false }) } />      
        </div>
    )

    return (
      <Dialog header="Não Informe seu dados pessoais" 
              visible={this.state.visible} 
              style={{width: '50vw'}} 
              footer= { confirmDialogFooter }
              modal={true} 
              onHide={ () => this.setState({visible: false}) } >
        Você pode cadastrar qualquer e-mail, o sistema não verifica se o email de fato existe,
        mas atenção, não informe seu email e senhas pessoais pois o sistema não lida com criptografia
        de dados.
      </Dialog>   
    )
  }
}

export default Alert