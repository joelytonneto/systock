import { Produto } from "../produtos/produto";
import { ItensVenda } from "./model/itensVenda";
import { Pagamento } from "./model/pagamento";
import { FormaPagamento } from './../formas-pagamentos/formaPagamento';
import { Cliente } from "../clientes/cliente";
import { Entregador } from "../entregadores/entregador";

export class Venda {
    id: number;
    idCliente: number;
    cliente: Cliente;
    produto: Produto;
    formaPagamento: FormaPagamento;
    dataVenda: string;
    valorBruto: number;
    desconto: number = 0;
    valorLiquido: number;
    valorPago: number;
    troco: number = 0;
    idEntregador: number;
    entregador: Entregador;
    taxaEntrega: number = 0;
    observacao: string;
    statusPedido: string;
    pago: boolean;
    itensVenda: Array<ItensVenda> = [];
    pagamentosVenda: Array<Pagamento> = [];
    enderecoVenda: Cliente = new Cliente();
}