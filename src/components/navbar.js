import React from 'react'

import NavbarItem from './navbaritem'
import { AuthConsumer }  from '../main/ProvedorDeAutentificacao'

function Navbar (props) {
  if(props.isAutenticado) {
    return (
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
        <div className="container">
          <a href="#/" className="navbar-brand">Minhas Finanças</a>
          <button className="navbar-toggler" 
                  type="button" 
                  data-toggle="collapse" 
                  data-target="#navbarResponsive" 
                  aria-controls="navbarResponsive" 
                  aria-expanded="false" 
                  aria-label="Toggle navigation" >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
              <NavbarItem render={props.isAutenticado} label="home" href ="#/home" />
              <NavbarItem render={props.isAutenticado} label="Usuários" href ="#cadastro-usuarios" />
              <NavbarItem render={props.isAutenticado} label="Lançamentos" href ="#/consulta-lancamento" />
              <NavbarItem render={props.isAutenticado} click={props.deslogar} label="Sair" href ="#/login" />  
            </ul>
          </div>
        </div>
      </div>
  )}else{
    return false
  }
}

export default () => (
  <AuthConsumer> 
   {(context) => (<Navbar isAutenticado={context.isAutenticado} 
                          deslogar={context.encerrarSessao} /> )}
  </AuthConsumer>
)