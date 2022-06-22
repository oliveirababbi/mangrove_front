import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaModel } from '../model/CategoriaModel';
import { ProdutosModel } from '../model/ProdutosModel';
import { CategoriasService } from '../service/categorias.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {

  produto: ProdutosModel = new ProdutosModel;
  
  categoria: CategoriaModel = new CategoriaModel;

  constructor(
    private produtoService: ProdutosService,
    private categoriaService: CategoriasService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(){
    window.scroll(0,0)
    this.produtoService.refreshToken();
    let id = this.route.snapshot.params['id'];

    this.getProdutoById(id);
  }

  getProdutoById(id:number){
    this.produtoService.getByIdProdutos(id).subscribe((resp: ProdutosModel) =>{
      this.produto = resp;
    })
  }
}