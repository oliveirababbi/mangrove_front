import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLoginModel } from '../model/UsuarioLoginModel';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  usuarioLoginModel : UsuarioLoginModel = new UsuarioLoginModel()

  constructor(
    private auth : AuthService,
    private router : Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
  window.scroll(0,0) 
  }

  entrar() {
    this.auth.entrar(this.usuarioLoginModel).subscribe({
        next: (resp: UsuarioLoginModel)=>{
        this.usuarioLoginModel = resp
        environment.tokenUsuario = this.usuarioLoginModel.token
        environment.nomeUsuario = this.usuarioLoginModel.nomeUsuario
        environment.fotoUsuario = this.usuarioLoginModel.fotoUsuario
        environment.id = this.usuarioLoginModel.id
        environment.tipoUsuario = this.usuarioLoginModel.tipoUsuario
        //console.log(environment)
        
        this.router.navigate(['/home'])
      },
      error: erro => {
        if(erro.status == 401) {
        this.alertas.showAlertDanger('Atenção! Usuario ou senha incorretos.')
    
        }
      },
    });
  }
}
