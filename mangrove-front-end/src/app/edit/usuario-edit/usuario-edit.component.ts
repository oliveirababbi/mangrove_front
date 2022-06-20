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
  idUsuario= environment.id

  constructor(
    private auth : AuthService,
    private router : Router,
    private alertas: AlertasService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    window.scroll(0,0)

    let id = this.route.snapshot.params['id'];
    this.findByIdUsuario(this.idUsuario);
  }
    confirmaSenha(event: any){
      this.confirmarSenha = event.target.value
    }
    tipoDoUsuario(event: any){
      this.tipUsuario = event.target.value
    }
    atualizar(){
        this.usuarioModel.tipoUsuario = this.tipUsuario;
    
        if (this.usuarioModel.passwordUsuario != this.confirmarSenha) {
          this.alertas.showAlertDanger('As senhas estão incorretas.');
        } else {
          this.auth.atualizar(this.usuarioModel).subscribe((resp: UsuariosModel) => {
            this.usuarioModel = resp;
            this.router.navigate(['/inicio']);
            this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente');
            environment.tokenUsuario = '';
            environment.nomeUsuario = '';
            environment.fotoUsuario = '';
            environment.id = 0;
            environment.tipoUsuario = '';
            this.router.navigate(['/entrar']);
          });
        }
    }

    findByIdUsuario(id: number) {
      this.auth.getByIdUser(id).subscribe((resp: UsuariosModel) => {
        this.usuarioModel = resp;
        this.usuarioModel.passwordUsuario = ''
      });
    }
  
}
  



