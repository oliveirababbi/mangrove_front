import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarCategoriaComponent } from './buscar/buscar-categoria/buscar-categoria.component';
import { BuscarProdutosComponent } from './buscar/buscar-produtos/buscar-produtos.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ComponentSobreNosComponent } from './component-sobre-nos/component-sobre-nos.component';
import { ComponenteRaizesComponent } from './componente-raizes/componente-raizes.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProdutoComponent } from './produto/produto.component';
import { RodapeComponent } from './rodape/rodape.component';
import { CarrinhoComprasComponent } from './carrinho-compras/carrinho-compras.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'entrar',component:EntrarComponent},
  {path:'cadastrar',component:CadastrarComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'categoria-edit/:id', component: CategoriaEditComponent},
  {path: 'categoria-delete/:id', component: CategoriaDeleteComponent},
  {path: 'produto-delete/:id', component: ProdutoDeleteComponent},
  {path: 'produto-edit/:id', component: ProdutoEditComponent},
  {path: 'produto',component: ProdutoComponent},
  {path: 'buscar-categoria/:id', component: BuscarCategoriaComponent},
  {path: 'detalhe-produto/:id', component: DetalheProdutoComponent},
  {path: 'buscar-produtos', component:BuscarProdutosComponent},
  {path: 'componente-raizes', component: ComponenteRaizesComponent},
  {path: 'componente-sobre-nos', component: ComponentSobreNosComponent},
  {path: 'usuario-edit/:id', component: UsuarioEditComponent},
  {path: 'carrinho-compras/:id', component: CarrinhoComprasComponent},
  {path: 'perfil/:id', component: PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
