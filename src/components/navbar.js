import React, { useState } from 'react'

import NavbarItem from './navbaritem'
import { AuthConsumer }  from '../main/ProvedorDeAutentificacao'
import {Sidebar} from 'primereact/sidebar';

function Navbar (props) {

  const [visible, setVisible] = useState(false);

  const menuHamburguer = () => {
    if(visible) 
      setVisible(false);
    else
      setVisible(true);

    console.log(visible)
  }

  const sair = () => {
    setVisible(false);
    props.deslogar()
  }

  if(props.isAutenticado) {

    return (
      <>
        <Sidebar 
              visible={visible} 
              position="bottom" 
              baseZIndex={1000000}
              style={ {height: '100vh' , textAlign: 'center'} }                             
              onHide={menuHamburguer}>
          <div className="p-sidebar-full center">
            <div className="sidebar"> 
            <ul className="navbar-nav">
                <NavbarItem render={props.isAutenticado} click={menuHamburguer} label="home" href ="#/home" />
                <NavbarItem render={props.isAutenticado} click={menuHamburguer} label="Usuários" href ="#cadastro-usuarios" />
                <NavbarItem render={props.isAutenticado} click={menuHamburguer} label="Lançamentos" href ="#/consulta-lancamento" />
                <NavbarItem render={props.isAutenticado} click={sair} label="Sair" href ="#/login" />  
              </ul>     
            </div>              
          </div>             
        </Sidebar>

      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >        
        <div className="container">
          <a href="#/" className="navbar-brand">Minhas Finanças</a>            
          <button className="navbar-toggler" 
                  type="button" 
                  data-toggle="collapse" 
                  data-target="#navbarResponsive" 
                  aria-controls="navbarResponsive" 
                  aria-expanded="true" 
                  aria-label="Toggle navigation"
                  onClick={menuHamburguer} >
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
      </>
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