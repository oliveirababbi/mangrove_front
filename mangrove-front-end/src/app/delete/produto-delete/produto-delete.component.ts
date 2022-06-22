import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProdutosModel } from 'src/app/model/ProdutosModel';
import { AlertasService } from 'src/app/service/alertas.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {
  
  idProduto: number;
  produto: ProdutosModel = new ProdutosModel();


  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private alertas: AlertasService  
    ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.tokenUsuario == ''){
      this.router.navigate(['/entrar']) 
    }
    this.idProduto=this.route.snapshot.params['id']
    this.findByIdProdutos(this.idProduto)
    }

    findByIdProdutos(id: number){
      this.produtosService.getByIdProdutos(id).subscribe((resp: ProdutosModel) =>{
        this.produto = resp
      })
    }
 
    deletarProduto(){
      this.produtosService.deleteProdutos(this.idProduto).subscribe(()=>{
        this.alertas.showAlertSuccess('Produto removido com sucesso!')
        this.router.navigate(['/buscar-produtos'])
      })
}

}

