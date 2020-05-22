import Api from '../api'

import ErrosValidacaoException from './errosValidacao'

class UsuarioService extends Api {
  constructor() {
    super('/api/usuarios')
  }

  autenticar(credenciais){
    return this.post('/autenticar', credenciais)   
  }

  obterSaldoUsuario(id){
    return this.get(`/${id}/saldo`)
  }

  cadastrarUsuario(usuario) {
    return this.post('/', usuario);
  }

  validar(usuario) {
    const erros = [];

    if(!usuario.nome) 
      erros.push('O campo Nome é obrigatório.');

    if(!usuario.email)
      erros.push('O Campo Email é obrigatório.');

    else if( !usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/))
      erros.push('Informe um Email válido.');
          
    if(!usuario.senha || !usuario.senhaRepeticao)
      erros.push('Digite a Senha duas vezes');
    
    else if(usuario.senha !== usuario.senhaRepeticao)
      erros.push('As senhas não batem.');

    if(erros && erros.length > 0)
      throw new ErrosValidacaoException(erros);
  }

}

export default UsuarioService