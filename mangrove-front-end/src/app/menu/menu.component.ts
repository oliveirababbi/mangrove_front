import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CategoriaModel } from '../model/CategoriaModel';
import { AuthService } from '../service/auth.service';
import { CategoriasService } from '../service/categorias.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nomeUsuario
  foto = environment.fotoUsuario
  id = environment.id

  listaCategorias: CategoriaModel[] 
  categoria: CategoriaModel = new CategoriaModel()
  idCategoria: number

  constructor(
    private router: Router,
    private categoriaService: CategoriasService,
    private auth: AuthService

  ) { }

  ngOnInit() {
    this.findAllCategorias()
  }


  sair(){
    this.router.navigate(['/entrar'])
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

  logado () {
    let ok: boolean = false;
    if (environment.tokenUsuario != '') {
      ok = true
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

  administrador () {
    let ok: boolean = false;
    if (environment.tipoUsuario == 'adm') {
      ok = true
    }
    return ok
  }
}
