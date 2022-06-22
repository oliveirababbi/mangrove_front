import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasComponent } from 'src/app/alertas/alertas.component';
import { CategoriaModel } from 'src/app/model/CategoriaModel';
import { ProdutosModel } from 'src/app/model/ProdutosModel';
import { UsuariosModel } from 'src/app/model/UsuariosModel';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriasService } from 'src/app/service/categorias.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  produto: ProdutosModel = new ProdutosModel()
  listaProdutos: ProdutosModel[]
 
  categoria: CategoriaModel= new CategoriaModel()
  listCategorias: CategoriaModel[]
  idCategoria: number
 
  usuario: UsuariosModel = new UsuariosModel()
  idUsuario = environment.id
 
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
    private alertas: AlertasService,
    private authService: AuthService
  ) { }
 
  ngOnInit() {
    window.scroll(0,0)
    if(environment.tokenUsuario== ''){
      alert('Sua sessão expirou faça o login novamente.')
      this.router.navigate(['/entrar'])
  }
    let id = this.route.snapshot.params['id']
    this.findByIdProdutos(id)
    this.findAllCategorias() 
}
 
  findByIdProdutos(id: number){
  this.produtosService.getByIdProdutos(id).subscribe((resp: ProdutosModel)=>{
    this.produto = resp
  })
 
  }
  findByIdCategorias(){
    this.categoriasService.getByIdCategorias(this.idCategoria).subscribe((resp:CategoriaModel)=>{
      this.categoria = resp
    })
  }
 
  findAllCategorias(){
  this.categoriasService.getAllCategorias().subscribe((resp: CategoriaModel[]) =>{
    this.listCategorias = resp
  })
 
  }
 
  findAllProduto(){
    this.produtosService.getAllProdutos().subscribe((resp: ProdutosModel[])=>{
      this.listaProdutos=resp
    })
  }
 
  atualizar(){
    this.categoria.id=this.idCategoria
    this.produto.categoria=this.categoria

    this.usuario.id = this.idUsuario
    this.produto.usuario = this.usuario
    
    this.produtosService.putProdutos(this.produto).subscribe((resp:ProdutosModel)=>{
      this.produto = resp
      this.alertas.showAlertSuccess('Produto atualizado com sucesso!')
      this.router.navigate(['/buscar-produtos'])
      console.log(this.produto)
      console.log(environment.tokenUsuario)
    })
}
 
cadastrarCategoria(){
  this.categoriasService.postCategorias(this.categoria).subscribe((resp:CategoriaModel)=>{
    this.categoria=resp
    this.alertas.showAlertSuccess('Categoria cadastrada com sucesso!')
    this.findAllCategorias()
    this.categoria= new CategoriaModel()      
  })
}

}
