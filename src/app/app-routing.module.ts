import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { ABMProductosComponent } from './components/abm-productos/abm-productos.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listProductos'
  },
  { path: 'listProductos', component: ListadoProductosComponent },
  { path: 'editProducto/:id', component: ABMProductosComponent },
  { path: 'addProducto', component: ABMProductosComponent },
  { path: '**', redirectTo: 'listProductos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
