import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosModel } from '../model/ProdutosModel';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-carrinho-compras',
  templateUrl: './carrinho-compras.component.html',
  styleUrls: ['./carrinho-compras.component.css']
})
export class CarrinhoComprasComponent implements OnInit {

  quant: number = 1

  produto: ProdutosModel =new ProdutosModel()
  listaProdutos: ProdutosModel[]

  produtoId: number

  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosService
  ) { }

  ngOnInit() {

    let id = this.route.snapshot.params['id']
    this.getProdutoById(id)
  }


  getProdutoById(id: number){
    this.produtosService.getByIdProdutos(id).subscribe((resp: ProdutosModel)=>{
      this.produto=resp
    })
  }

  mudarQuantiMenos(){
    this.quant = this.quant-1
  }

  mudarQuantiMais(){
    this.quant = this.quant+1
  }

}
