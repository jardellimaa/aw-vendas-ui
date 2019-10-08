import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  private api = 'http://192.168.31.180:8080';

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(this.api + "/vendas");
  }

  adicionar(venda: any){
    return this.http.post(this.api + "/vendas", venda);
  }

  listarClientes(){
    return this.http.get(this.api + "/clientes");
  }

  listarProdutos(){
    return this.http.get(this.api + "/produtos");
  }
}
