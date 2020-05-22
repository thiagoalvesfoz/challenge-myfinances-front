import React from 'react'
import {Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import { AuthConsumer } from '../main/ProvedorDeAutentificacao'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import ConsultaLancamento from '../views/lancamentos/consultas-lancamento'
import CadastroLancamento from '../views/lancamentos/cadastroLancamentos'



function RotaAutenticada( { component: Component, isAutenticado, ...props } ) {
  return (
    <Route {...props} render={ (componentProps) => {      
      if(isAutenticado) 
        return ( <Component {...componentProps } /> )      
      else
        return ( <Redirect to={ {pathname: '/login', state : { from: componentProps.location } } } /> )
    } 
    }/>
  )
}

function Rotas(props) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/cadastro-usuarios" component={CadastroUsuario} />
        <RotaAutenticada isAutenticado={props.isUsuarioAutenticado} exact path="/" component={Home} />
        <RotaAutenticada isAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
        <RotaAutenticada isAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamento" component={ConsultaLancamento} />
        <RotaAutenticada isAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamento/:id?" component={CadastroLancamento} />
      </Switch>
    </HashRouter>
  )
}

export default () => (
  <AuthConsumer> 
    { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} /> )  } 
  </AuthConsumer>
)