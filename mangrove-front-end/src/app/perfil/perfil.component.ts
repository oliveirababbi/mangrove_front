import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ProdutosModel } from '../model/ProdutosModel';
import { UsuariosModel } from '../model/UsuariosModel';
import { AuthService } from '../service/auth.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  
  produto: ProdutosModel = new ProdutosModel()
  usuario: UsuariosModel = new UsuariosModel()
  listaProdutos: ProdutosModel[]

  idUsuario: 0

  constructor(
    private router: Router,
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private authService: AuthService

  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.tokenUsuario == ''){
      alert("Sua sessão expirou faça o login novamente.")
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']
    this.getProdutos()
    this.idUsuario= id
    this.findByIdUsuario()
    this.getProdutos()
  }

  findByIdUsuario(){
    this.authService.getByIdUser(this.idUsuario).subscribe((resp: UsuariosModel)=>{
      this.usuario = resp
    })
  }

  getProdutos(){
    this.produtosService.getAllProdutos().subscribe((resp: ProdutosModel[])=>{
      this.listaProdutos=resp
    })
  }

  verificaoaUsuario(){
    let ok: boolean = false;
    if (environment.id == this.idUsuario){
      ok = true
    }
    return ok
  }
}
