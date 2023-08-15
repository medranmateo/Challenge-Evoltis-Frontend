import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from 'src/app/interfaces/Producto';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss'],
  providers: [MessageService]
})
export class ListadoProductosComponent implements OnInit {

  @ViewChild('dt') dt!: Table;

  productos!: Producto[];
  loading: boolean = true;

  constructor(
    private _productoService: ProductoService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.productos = data;
      this.loading = false;
    });
  }

  editProduct(id: number) {
    this.router.navigate([`/editProducto/${id}`])
  }


  deleteProduct(id: number) {

    this._productoService.deleteProducto(id).subscribe(() => {
      this.getProductos();
    });
  }


  showConfirm(producto: Producto) {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'¿Estas seguro?', detail:`Eliminar el producto: ${producto.nombre}`});
}

  onConfirm(id: number) {
    this.messageService.clear('c');
    this.deleteProduct(id)
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

  applyFilter(event: any) {
    const inputValue = event?.target?.value;
    if (inputValue) {
      this.dt?.filter(inputValue, 'codigo', 'contains');
    }
  }

}
