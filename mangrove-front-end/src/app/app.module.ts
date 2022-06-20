import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';



import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { HomeComponent } from './home/home.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import { AlertasComponent } from './alertas/alertas.component';
import { OrderModule } from 'ngx-order-pipe';
import { ProdutoComponent } from './produto/produto.component';
import { BuscarCategoriaComponent } from './buscar/buscar-categoria/buscar-categoria.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { BuscarProdutosComponent } from './buscar/buscar-produtos/buscar-produtos.component';
import { ComponenteRaizesComponent } from './componente-raizes/componente-raizes.component';
import { ComponentSobreNosComponent } from './component-sobre-nos/component-sobre-nos.component';
import { CarrinhoComprasComponent } from './carrinho-compras/carrinho-compras.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    CadastrarComponent,
    HomeComponent,
    CategoriaComponent,
    CategoriaEditComponent,
    CategoriaDeleteComponent,
    ProdutoEditComponent,
    ProdutoDeleteComponent,
    AlertasComponent,
    ProdutoComponent,
    BuscarCategoriaComponent,
    DetalheProdutoComponent,
    BuscarProdutosComponent,
    ComponenteRaizesComponent,
    ComponenteRaizesComponent,
    ComponentSobreNosComponent,
    CarrinhoComprasComponent,
    UsuarioEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    OrderModule
    
  ],
  providers: [{ 
    provide: LocationStrategy,
    useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]

})
export class AppModule { }
