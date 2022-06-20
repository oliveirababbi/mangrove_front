import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaModel } from '../model/CategoriaModel';
import { ProdutosModel } from '../model/ProdutosModel';
import { AuthService } from '../service/auth.service';
import { CategoriasService } from '../service/categorias.service';
import { ProdutosService } from '../service/produtos.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';
import { UsuariosModel } from '../model/UsuariosModel';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  produto: ProdutosModel = new ProdutosModel()
  listaProdutos: ProdutosModel[]

  categoria: CategoriaModel= new CategoriaModel()
  listCategorias: CategoriaModel[]
  idCategoria: number

  usuario: UsuariosModel= new UsuariosModel()
  idUsuario = environment.id

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
    private alertas: AlertasService
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

  cadastrar(){
    this.categoria.id=this.idCategoria
    this.produto.categoria=this.categoria

    this.usuario.id = this.idUsuario

    this.produto.usuario = this.usuario
    
    this.produtosService.postProdutos(this.produto).subscribe((resp:ProdutosModel)=>{
      this.produto = resp
      this.alertas.showAlertSuccess('Produto atualizado com sucesso!')
      this.router.navigate(['/buscar-produtos'])
      this.findAllProduto()
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