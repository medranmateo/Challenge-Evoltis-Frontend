import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/Producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-abm-productos',
  templateUrl: './abm-productos.component.html',
  styleUrls: ['./abm-productos.component.scss']
})
export class ABMProductosComponent implements OnInit {

  productForm: FormGroup;
  loading    : boolean = false;
  id: number;

  operacion: string = 'Agregar';

  constructor(
    private formBuilder: FormBuilder,
    private _productoService: ProductoService,
    private aRoute: ActivatedRoute,
    private router: Router) 
  { 
    this.productForm = this.formBuilder.group({
      codigo   : ['', Validators.required],
      nombre   : ['', Validators.required],
      categoria: ['', Validators.required],
      stock    : ['', Validators.required],
      precio   : ['', Validators.required],
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if(this.id != 0) {
      this.operacion = 'Editar';
      this.getProducto(this.id)
    }

  }

  getProducto(id: number){
    this.loading = true

    this._productoService.getProducto(id).subscribe(prod =>{
      this.productForm.setValue({
        codigo   : prod.codigo ,
        nombre   : prod.nombre ,
        categoria: prod.categoria ,
        stock    : prod.stock ,
        precio   : prod.precio 
      })
      this.loading = false;
    })
  }

  addOrEditProduct(){
    // Armamos el objeto
    const producto: Producto = {
        codigo   : this.productForm.value.codigo,
        nombre   : this.productForm.value.nombre,
        categoria: this.productForm.value.categoria,
        stock    : this.productForm.value.stock,
        precio   : this.productForm.value.precio
    }

    if(this.id != 0) {
      producto.id = this.id;
      this.editProduct(this.id, producto);
    } else {
      this.addProduct(producto);
    }

    console.log(producto)
  }
  
  editProduct(id: number, producto: Producto) {
    this.loading = true
    this._productoService.updateProducto(id, producto).subscribe(() =>{
      this.loading = true;
      console.log('editado')
      //this.mensajeExito('actualizada');
      this.router.navigate(['/listProductos']);
    })
  }
  
  addProduct(producto: Producto) {

    if( this.productForm.valid ){
      this._productoService.addProducto(producto).subscribe(data => {
        console.log('Restrado', data)
        //this.mensajeExito('registrada');
        this.productForm.reset();
        this.router.navigate(['/listProductos']);
      })
    }

  }


}
