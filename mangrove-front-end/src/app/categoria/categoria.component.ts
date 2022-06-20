import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CategoriaModel } from '../model/CategoriaModel';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { CategoriasService } from '../service/categorias.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: CategoriaModel = new CategoriaModel()
  listaCategorias: CategoriaModel[]

  nomeCategoria: string

  constructor(
    private router: Router, 
    private categoriasService: CategoriasService,
    private authService: AuthService,
    private alertas: AlertasService
    ) { 

    }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.tokenUsuario == ""){
      //alert("Sessão encerrada! Faça login novamente.")
      this.router.navigate(["/entrar"])    
  }   
    if(environment.tipoUsuario != "adm"){
      alert("Você precisa ser Administrador para acessar essa rota")
      this.router.navigate(['/home'])
    }
    this.findAllCategorias()
  
}


findAllCategorias(){
  this.categoriasService.getAllCategorias().subscribe((resp: CategoriaModel[])=>{
    this.listaCategorias=resp
  })
}

findByNomeCategoria(){
  if(this.nomeCategoria ==''){
    this.findAllCategorias()
  } else{
    this.categoriasService.getByNomeCategoria(this.nomeCategoria).subscribe((resp: CategoriaModel[]) =>{
      this.listaCategorias=resp
    })
  }
}

cadastrarCategoria(){
  this.categoriasService.postCategorias(this.categoria).subscribe((resp:CategoriaModel)=>{
    this.categoria=resp
    this.alertas.showAlertSuccess('Categoria cadastrada com sucesso!')
    this.findAllCategorias()
    this.categoria= new CategoriaModel()      
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
