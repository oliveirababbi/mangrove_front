import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaModel } from 'src/app/model/CategoriaModel';
import { ProdutosModel } from 'src/app/model/ProdutosModel';
import { CategoriasService } from 'src/app/service/categorias.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-buscar-categoria',
  templateUrl: './buscar-categoria.component.html',
  styleUrls: ['./buscar-categoria.component.css']
})
export class BuscarCategoriaComponent implements OnInit {

  categoria: CategoriaModel = new CategoriaModel()
  listaCategorias: CategoriaModel[]

  produto: ProdutosModel = new ProdutosModel()
  listaProdutos: ProdutosModel[]
  nomeProduto: string

  key: string
  reverse: boolean

  constructor(
    private router: Router,
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private categoriasService: CategoriasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    // if(environment.tokenUsuario == ""){
    //   //alert("Sessão encerrada! Faça login novamente.")
    //   this.router.navigate(["/entrar"])
    // }

    
    let id= this.route.snapshot.params['id']
    this.findByIdCategoria(id)
    this.findAllProdutos()
  }

  opcaoKey(event: any){
    let keyOp = event.target.value

    if(keyOp == 1 ){
      this.key = 'nomeProduto'
    } else if(keyOp == 2){
      this.key = 'valorProduto'
    }
      
  }

  findAllProdutos(){
    this.produtosService.getAllProdutos().subscribe((resp: ProdutosModel[])=>{
      this.listaProdutos = resp
    })
  }

  findByIdCategoria(id: number){
    this.categoriasService.getByIdCategorias(id).subscribe((resp: CategoriaModel) =>{
      this.categoria= resp
    })
  }

  findByNomeProduto(){

    if(this.nomeProduto ==''){
      this.findAllProdutos()
    } else{
      this.produtosService.getByNomeProduto(this.nomeProduto).subscribe((resp: ProdutosModel[]) => {
        this.listaProdutos = resp
      })
    }  
  }

  administrador () {
    let ok: boolean = false;
    if (environment.tipoUsuario == 'adm') {
      ok = true
    }
    return ok
  }
}