import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { Entregador } from '../../entregadores/entregador';
import { EntregadoresService } from 'src/app/entregadores/entregadores.service';
import { Venda } from '../venda';
import { VendasService } from '../vendas.service'; 
import { Produto } from 'src/app/produtos/produto';
import { ProdutosService } from 'src/app/produtos/produtos.service';
import { FormaPagamento } from '../../formas-pagamentos/formaPagamento';
import { FormasPagamentosService } from '../../formas-pagamentos/formasPagamentos.service';
import jQuery from 'jquery';
import { SelectItem } from 'primeng';
import * as _ from "lodash";
import { ptbr } from 'src/app/utils/calendar-prime-ng';
import { statusPedidoSelect, valoresTaxaEntrega } from './valuesDropDown';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { Pagamento } from '../model/pagamento';
import * as moment from 'moment';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItensVenda } from '../model/itensVenda';

@Component({
  selector: 'app-vendas-form',
  templateUrl: './vendas-form.component.html',
  styleUrls: ['./vendas-form.component.css'],
  providers: [ ConfirmationService ]
})
export class VendasFormComponent implements OnInit {

  clientes: Cliente[] = [];
  entregadores: Entregador[] = [];
  produtos: Produto[] = [];
  formasPagamentos: FormaPagamento[] = [];

  clienteVenda: Cliente = new Cliente();

  position: string;

  venda: Venda = new Venda();
  pagamento: Pagamento;
  produto: Produto;

  quantidadeVenda: number = 1;
  valorFormaPagamento: any;
  valorTotalVenda: number = 0;
  valorTotalVendaBruto: number = 0;
  valorTotalPago: number = 0;
  valorDescontoDialog: any;

  success: boolean = false;
  errors: String[];

  formasPagamentosSelect: SelectItem[] = [];
  produtosSelect: SelectItem[] = [];
  clientesSelect: SelectItem[] = [];
  entregadorSelect: SelectItem[] = [];
  statusPedidoSelect: SelectItem[] = [];
  valoresTaxaEntregaSelect: SelectItem[] = [];
  
  dataVenda: Date = new Date();
  ptbr = ptbr;

  msgs: Message[] = [];

  displayPositionRealizarPagamento: boolean;
  displayPositionDesconto: boolean;

  message: string;

  constructor(
    private clienteService: ClientesService,
    private entregadorService: EntregadoresService,
    private produtoService: ProdutosService,
    private formasPagamentosService: FormasPagamentosService,
    private service: VendasService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) { 
    this.valorTotalVenda = 0;
    this.venda = new Venda();
    
    this.statusPedidoSelect = statusPedidoSelect;
    this.valoresTaxaEntregaSelect = valoresTaxaEntrega;
  }

  ngOnInit(): void {    
    this.clienteService
      .getClientes()
      .subscribe( responseClientes => {
        this.clientes = responseClientes;
        this.clientesSelect.push({ label: 'CLIENTE NÃO CADASTRADO', value: null });
        this.clientes.forEach(cliente => {
          if(cliente.ativo) {
            this.clientesSelect.push({ label: `${cliente.celular} - ${cliente.nome.toUpperCase()}`, value: cliente.id });
          }
        });
      });

    this.entregadorService
      .getEntregadores()
      .subscribe( responseEntregadores => {
        this.entregadores = responseEntregadores;
        this.entregadores.forEach(entregador => {
          if(entregador.ativo) {
            this.entregadorSelect.push({ label: `${entregador.nome}`, value: entregador.id });
          }
        });
      });

    this.produtoService
      .getProdutos()
      .subscribe( responseProdutos => {
        this.produtos = responseProdutos;
        this.produtos.forEach(produto => {
          if(produto.ativo) {
            this.produtosSelect.push({ label: `${produto.codigoEan} - ${produto.descricao}`, value: produto });
          }
        });
      });

    this.formasPagamentosService
      .getFormasPagamentos()
      .subscribe( responseFormasPagamentos => {
        this.formasPagamentos = responseFormasPagamentos;
        this.formasPagamentos.forEach(formaPagamento => {          
          if(formaPagamento.ativo) {
            this.formasPagamentosSelect.push({ label: formaPagamento.descricao.toUpperCase(), value: formaPagamento });
          }
        });
      });

    this.addEventInputQtd();
    
    this.carregarVenda();
  }

  inserirVenda(){

    this.venda.valorPago = this.valorTotalPago;
    this.venda.valorLiquido = this.valorTotalVendaBruto;
    this.venda.valorBruto = (this.valorTotalVendaBruto + this.venda.desconto);
    this.venda.dataVenda = moment(this.dataVenda).locale('pt-br').format('DD/MM/YYYY');
    this.venda.enderecoVenda = this.clienteVenda;
    this.venda.pago = true;
    if(this.venda.troco < 0) this.venda.troco = 0;

    this.service
      .salvar(this.venda)
      .subscribe( response => {
        this.success = true;
        this.errors = null;
        this.venda = new Venda();
        this.clienteVenda = new Cliente();
        this.valorTotalVendaBruto = 0;
        this.valorTotalVenda = 0;
        this.displayPositionRealizarPagamento = false;
        setTimeout(() => {
          this.success = null;          
        }, 2000);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })
  }

  salvarPreVenda(){

    this.venda.valorPago = this.valorTotalPago;
    this.venda.valorLiquido = this.valorTotalVendaBruto;
    this.venda.valorBruto = (this.valorTotalVendaBruto + this.venda.desconto);
    this.venda.dataVenda = moment(this.dataVenda).locale('pt-br').format('DD/MM/YYYY');
    this.venda.enderecoVenda = this.clienteVenda;
    this.venda.pago = false;
    if(this.venda.troco < 0) this.venda.troco = 0;

    this.service
      .salvar(this.venda)
      .subscribe( response => {
        this.success = true;
        this.errors = null;
        this.venda = new Venda();
        this.clienteVenda = new Cliente();
        this.valorTotalVendaBruto = 0;
        this.valorTotalVenda = 0;
        this.displayPositionRealizarPagamento = false;
        setTimeout(() => {
          this.success = null;          
        }, 2000);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })
  }

  addProduto() {
    if(_.isNil(this.venda.produto)) {
      alert('Escolha um item antes de adicionar a quantidade');
    } else {
      if(_.isNil(this.quantidadeVenda) || (this.quantidadeVenda <= 0)) {
        alert('A quantidade precisa ser maior que 0');
      } else {
        let produto = this.venda.produto;

        this.venda.itensVenda.push({                    
          id: null,
          venda: null,
          produto: produto,
          dataRegistro: null,
          valor: produto.precoVenda,
          quantidade: this.quantidadeVenda
        });

        jQuery('tbody').animate({
          scrollTop: jQuery("tbody")[0].scrollHeight
        }, 10);

        this.calcularTotalCompra();
      }
    }
  }

  addFormaPagamento() {
    let formaPagamento = this.venda.formaPagamento;
    let valorPagamento = this.valorFormaPagamento ? Number(this.valorFormaPagamento.replace(',','.')) || 0 : 0;
    if(_.isNil(formaPagamento)) {
      alert('Escolha uma forma de pagamento antes de adicionar o valor');
    } else {      
      if(_.isNil(valorPagamento) || (valorPagamento <= 0)) {
        alert('O valor precisa ser maior que 0');
      } else {

        this.venda.pagamentosVenda.push({                    
          id: null,
          venda: null,
          formaPagamento: formaPagamento,
          valor: valorPagamento,
          dataPagamento: null,
        });        

        jQuery('tbody').animate({
          scrollTop: jQuery("tbody")[0].scrollHeight
        }, 10);

        this.calcularTotalCompra();
      }
    }
  }

  focusQuantidade() {
    jQuery('#inputQuantidade').focus();
  }

  addEventInputQtd() {
    jQuery('#inputQuantidade').keypress((event) => {      
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        event.preventDefault();
        this.addProduto();        
      }
    });
  }

  getDadosClientes(idCliente) {
    this.clienteVenda = new Cliente();
    if(idCliente){
      this.clienteService
        .getClienteById(idCliente)
        .subscribe( 
          response => {
            this.clienteVenda = response;            
            return;
          } ,
          errorResponse => this.clienteVenda = new Cliente()
        )
    }
  }

  dialogRealizarPagamento(evento, position: string) {
    evento.preventDefault();
    this.calcularTroco();
    if(this.valorTotalVendaBruto > 0) {
      this.displayPositionRealizarPagamento = true;
      this.position = position;
    }
  }
  
  aplicarDesconto() {
    let valorDesconto = this.valorDescontoDialog ? Number(this.valorDescontoDialog.replace(',','.')) || this.valorDescontoDialog : 0;
    if(typeof valorDesconto == 'string' || (valorDesconto < 0)) {
      let valorDescontoDigitado = Number(valorDesconto.replace(',','.'));
      if(valorDescontoDigitado == 0) {
        this.displayPositionDesconto = false;
        this.venda.desconto = valorDescontoDigitado;
        this.valorDescontoDialog = 0;
        this.calcularTotalCompra();
        this.calcularTroco();
      } else {
        alert('Informe um valor válido');
      }
    } else {
      this.displayPositionDesconto = false;
      this.venda.desconto = valorDesconto;
      this.calcularTotalCompra();
      this.calcularTroco();
    }
  }

  calcularTroco() {
    this.venda.troco = (this.valorTotalPago - this.valorTotalVendaBruto);
  }

  removerItem(item) {
    this.venda.itensVenda.splice(item, 1);
    this.calcularTotalCompra(); 
  }

  removerFormaPagamento(item) {
    this.venda.pagamentosVenda.splice(item, 1);
    this.calcularTotalCompra();
  }

  calcularTotalCompra() {
    let somaTotalCompra = 0;
    let pagamentoTotalCompra = 0;

    this.venda.itensVenda.forEach(item => {
      somaTotalCompra += (item.valor * item.quantidade);
    });
    
    if(this.venda.pagamentosVenda) {
      this.venda.pagamentosVenda.forEach(item => {
        pagamentoTotalCompra += item.valor;
      });
    } else {
      pagamentoTotalCompra = 0;
    }

    this.valorTotalVenda = somaTotalCompra;
    this.valorTotalVendaBruto = (somaTotalCompra + Number(this.venda.taxaEntrega+'')) - this.venda.desconto;
    this.valorTotalPago = pagamentoTotalCompra;

    this.calcularTroco();
  }

  valorAbsoluto(valor) {
    return Math.abs(valor);
  }

  statusBotaoRealizarPagamento() {    
    if(this.valorTotalVendaBruto <= 0 || this.venda.idCliente === undefined) {
      return true;
    } else {
      return false;
    }
  }

  voltarParaConsultaVendas(){
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja voltar? Os dados inseridos não serão salvos',
      header: 'Voltar ao Painel de Vendas',
      icon: 'pi pi-info-circle',
      accept: () => {          
          this.router.navigate(['/vendas/lista']);
      },
      reject: () => {          
      },
      key: "positionDialog"
    });
  }

  carregarVenda() {
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
        let idVenda = urlParams['id'];
        if(idVenda){
          this.service
            .getVendaById(idVenda)
            .subscribe( 
              response => { 
                this.venda = response;
                this.preencherDadosVendaTela(this.venda);                
                return;
              } ,
              errorResponse => this.venda = new Venda()
            )

          this.service
            .getPagamentosVenda(idVenda)
            .subscribe(
              response => {
                this.venda.pagamentosVenda = response;
                return;
              } ,
              errorResponse => this.venda.pagamentosVenda = []
            )
          this.carregarItensVenda(idVenda);
        }
    });
  }

  preencherDadosVendaTela(venda: Venda) {
    this.clienteVenda.endereco = venda.cliente.endereco;
    this.clienteVenda.bairro = venda.cliente.bairro;
    this.clienteVenda.cidade = venda.cliente.cidade;
    this.clienteVenda.uf = venda.cliente.uf;
    this.clienteVenda.numero = venda.cliente.numero;
    this.venda.idEntregador = venda.entregador.id;
    this.venda.idCliente = venda.cliente.id;
    this.dataVenda = moment(venda.dataVenda, 'DD/MM/YYYY').toDate();
  }

  carregarItensVenda(idVenda) {
    let itensVenda = [];
    this.service
      .getItensVendaByIdVenda(idVenda)
      .subscribe(response => {
        itensVenda = response;
        this.venda.itensVenda = [];
        itensVenda.forEach(item => {
          this.venda.itensVenda.push({                    
            id: null,
            venda: null,
            produto: item.produto,
            dataRegistro: null,
            valor: item.produto.precoVenda,
            quantidade: item.quantidade
          });
        })
        
        this.calcularTotalCompra();
        
        if(itensVenda.length <= 0 ){
          this.message = "Nenhum Registro encontrado.";
        }else{
          this.message = null;
        }
    });
  }
}
