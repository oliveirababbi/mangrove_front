import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CategoriaModel } from '../model/CategoriaModel';
import { ProdutosModel } from '../model/ProdutosModel';
import { UsuariosModel } from '../model/UsuariosModel';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { CategoriasService } from '../service/categorias.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produto: ProdutosModel = new ProdutosModel()
  listaProdutos: ProdutosModel[]
  
  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private produtoService: ProdutosService,
    private categoriaService: CategoriasService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    //  if(environment.tokenUsuario == ""){
    // alert("Sessão encerrada! Faça login novamente.")
    //    this.router.navigate(["/entrar"])
    // }
 
    window.scroll(0,0)
    this.logado()
    this.findAllProdutos()
}

logado() {
  let ok: boolean = false;
  if (environment.tokenUsuario != '') {
    ok = true
    this.authService.refreshToken()
  }
  return ok
}

findAllProdutos(){
  this.produtoService.getAllProdutos().subscribe((resp: ProdutosModel[])=>{
    this.listaProdutos = resp
  })
}


administrador () {
  let ok: boolean = false;
  if (environment.tipoUsuario == 'adm') {
    ok = true
  }
  return ok
}

}
