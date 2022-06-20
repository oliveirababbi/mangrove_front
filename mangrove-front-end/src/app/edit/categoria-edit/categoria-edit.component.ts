import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaModel } from 'src/app/model/CategoriaModel';
import { AlertasService } from 'src/app/service/alertas.service';
import { CategoriasService } from 'src/app/service/categorias.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {

  categoria: CategoriaModel=new CategoriaModel()


  constructor(
    private router: Router,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.tokenUsuario == ''){
      // alert("Sessão encerrada, faça o login novamente.")
      this.router.navigate(['/entrar'])
    }
    let id= this.route.snapshot.params['id']
    this.findByIdCategoria(id)
  }

  findByIdCategoria(id: number){
    this.categoriasService.getByIdCategorias(id).subscribe((resp: CategoriaModel) =>{
      this.categoria= resp
    })
  }

  atualizar(){

    if(this.categoria.produtos == []){
      this.categoriasService.putCategorias(this.categoria).subscribe((resp: CategoriaModel)=>{
        this.categoria=resp
        this.alertas.showAlertSuccess('Categoria atualizada com sucesso!')
        this.router.navigate(['/categoria'])
      })    
    } else {
      this.alertas.showAlertDanger('Atenção! Não é possível modificar uma categoria que já possua produtos vinculados à ela.')
    }   
  }
}
