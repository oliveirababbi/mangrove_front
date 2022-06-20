import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosModel } from 'src/app/model/UsuariosModel';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})

export class UsuarioEditComponent implements OnInit {
  usuarioModel: UsuariosModel = new UsuariosModel()
  confirmarSenha: string
  tipUsuario: string
  idUsuario: number


  constructor(
    private auth : AuthService,
    private router : Router,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0,0)
  }
    confirmaSenha(event: any){
      this.confirmarSenha = event.target.value
    }
    tipoDoUsuario(event: any){
      this.tipUsuario = event.target.value
    }
    atualizar(){
      this.usuarioModel.id=this.idUsuario
  
    }
  
}
  



