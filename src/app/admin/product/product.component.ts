import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/common/Product';
import { PageService } from 'src/app/services/page.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  listData!: MatTableDataSource<Product>;
  products!: Product[];
  productsLength!: number;
  columns: string[] = ['image', 'productId', 'name', 'price', 'discount', 'category','quantity', 'status' ,'enteredDate', 'view', 'delete'];
searchProductId: string = '';
searchName: string = '';
searchPhone: string = '';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pageService: PageService, private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.pageService.setPageActive('product');
    this.getAll();
  }

  getAll() {
    this.productService.getAll().subscribe(data => {
      this.products = data as Product[];
      this.listData = new MatTableDataSource(this.products);
      this.productsLength = this.products.length;
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    }, error => {
      console.log(error);
    })
  }

  delete(id: number, name: string) {
    Swal.fire({
      title: 'Xóa sản phẩm ' + name + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe(data=>{
          this.ngOnInit();
          this.toastr.success('Thành công!', 'System!');
        },error=>{
          this.toastr.error('Thất bại!', 'System!');
        })
      }
    })
  }

  search() {
      this.productService.getAll().subscribe(data => {
          this.products = data as Product[];
          
          // Lọc theo từng trường tìm kiếm
          this.products = this.products.filter(products => {
              const matchesProductId = this.searchProductId === '' || products.productId === Number(this.searchProductId);
              const matchesName = this.searchName === '' || products.name.toLowerCase().includes(this.searchName.toLowerCase());
          
              
              // const orderDateString = new Date(order.orderDate).toISOString().slice(0, 10); // Chuyển về yyyy-MM-dd
              // const matchesOrderDate = this.searchOrderDate === '' || orderDateString === this.searchOrderDate;
  
              return matchesProductId && matchesName ;
          });
  
          // Cập nhật bảng
          this.listData = new MatTableDataSource(this.products);
          this.productsLength = this.products.length;
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
      });
  }

  finish() {
    this.ngOnInit();
  }
}
