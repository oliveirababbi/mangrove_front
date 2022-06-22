import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CategoriaModel } from '../model/CategoriaModel';
import { ProdutosModel } from '../model/ProdutosModel';
import { UsuariosModel } from '../model/UsuariosModel';
import { AuthService } from '../service/auth.service';
import { CategoriasService } from '../service/categorias.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  id: number

  usuario: UsuariosModel = new UsuariosModel()

  listaCategorias: CategoriaModel[] 
  categoria: CategoriaModel = new CategoriaModel()
  idCategoria: number

  produto: ProdutosModel = new ProdutosModel()

  constructor(
    private router: Router,
    private categoriaService: CategoriasService,
    private auth: AuthService,

  ) { }

  ngOnInit() {
    window.scroll(0,0)
    this.findAllCategorias()
  }   


  sair(){
    this.router.navigate(['/home'])
    environment.tokenUsuario = ''
    environment.nomeUsuario = ''
    environment.fotoUsuario = ''
    environment.id = 0
  }

  findByIdCategorias(){
    this.categoriaService.getByIdCategorias(this.idCategoria).subscribe((resp: CategoriaModel)=>{
      this.categoria = resp
    }) 
}

  findAllCategorias(){
    this.categoriaService.getAllCategorias().subscribe((resp: CategoriaModel[])=>{
      this.listaCategorias = resp
    })
  }

  logado() {
    let ok: boolean = false;
    if (environment.tokenUsuario != '') {
      ok = true
      this.id = environment.id
    }
    return ok
  }

  deslogado(){
    let ok: boolean = false;
    if (environment.tokenUsuario == '') {
      ok = true
    }
    return ok
  }

  findByIdUsuario(){
    this.auth.getByIdUser(this.id).subscribe((resp: UsuariosModel)=>{
      this.usuario = resp
    })
  }

  administrador() {
    let ok: boolean = false;
    if(this.logado()){
      if (environment.tipoUsuario == 'adm') {
        ok = true
      }
    }
    return ok
  }
}
