import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VendasService } from '../vendas/vendas.service';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-venda-cadastro',
  templateUrl: './venda-cadastro.component.html',
  styleUrls: ['./venda-cadastro.component.css']
})
export class VendaCadastroComponent implements OnInit {

  venda: any;
  item: any;
  produtos: Array<any>;
  clientes: Array<any>;
  @Output() vendaSalva = new EventEmitter();

  constructor(private vendaService: VendasService,
    private messageService: MessageService) { }

  novaVenda(){
    this.venda = { itens: [], frete: 0.0, total: 0.0 };
    this.item = {};
  }

  adicionar(frm: FormGroup){
    this.vendaService.adicionar(this.venda).subscribe(
      data => {
        frm.reset();
        this.novaVenda();
        this.messageService.add({ severity: 'success', detail: 'Venda adicionada com sucesso!'});
        this.vendaSalva.emit(data as any);
      },
      error => {

      }
    );
  }

  incluirItem(){
    this.item.total = (this.item.produto.valor * this.item.quantidade);
    this.venda.itens.push(this.item);
    this.item = {};
    this.calcularTotal();
  }

  calcularTotal(){
    const totalItens = this.venda.itens
    .map(i => (i.produto.valor * i.quantidade))
    .reduce((total, v) => total+v, 0);

    this.venda.total = totalItens + this.venda.frete;
  }

  ngOnInit() {
    this.listarClientes();
    this.listarProdutos();
    this.novaVenda();
  }

  private listarClientes(){
    this.vendaService.listarClientes().subscribe(
      data => {
        this.clientes = data as any;
      },
      error => {
        console.log(error);
      }
    );
  }

  private listarProdutos(){
    this.vendaService.listarProdutos().subscribe(
      data => {
        this.produtos = data as any;
      },
      error => {
        console.log(error);
      }
    );
  }

}
