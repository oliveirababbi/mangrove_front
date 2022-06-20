import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosModel } from '../model/UsuariosModel';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})


export class CadastrarComponent implements OnInit {
  usuarioModel: UsuariosModel = new UsuariosModel()
  confirmarSenha: string
  tipUsuario: string

  hrefTipo: string

  passAdm: string  
  
  constructor(
    private auth : AuthService,
    private router : Router,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
  window.scroll(0,0)
  this.userAdm()
  }
  confirmaSenha(event: any){
    this.confirmarSenha = event.target.value
  }
  tipoDoUsuario(event: any){
    this.tipUsuario = event.target.value
    this.userAdm()
  }
  
  cadastrar(){

    if(this.tipUsuario == "adm"){
      if(this.autenticarAdm()){
        this.usuarioModel.tipoUsuario = this.tipUsuario
      } else{
        this.alertas.showAlertDanger('Administrador não autenticado.')
      }
    } else{
      this.usuarioModel.tipoUsuario = this.tipUsuario
    }

    if(this.usuarioModel.passwordUsuario != this.confirmarSenha){
      this.alertas.showAlertDanger('As senhas estão incorretas.')
    } else{
      this.auth.cadastrar(this.usuarioModel).subscribe((resp: UsuariosModel)=> {
        this.usuarioModel=resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
      })     
    }
  }
  
  userAdm(){
    let ok: boolean = false;
    if (this.tipUsuario == 'adm') {
      ok = true
    }
    return ok
}

senhaAdm(event: any){
  this.passAdm = event.target.value
}

autenticarAdm(){
  let ok: boolean = false;
  if (this.passAdm == "adm2022") {
    ok = true
  }
  return ok
}

}
