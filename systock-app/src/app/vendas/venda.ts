import { ItensVenda } from "./model/itensVenda";

export class Venda {
    id: number;
    idCliente: number;
    dataVenda: string;
    valorBruto: number;
    desconto: number;
    valorLiquido: number;
    valorPago: number;
    troco: number;
    idEntregador: number;
    taxaEntrega: number;
    observacao: string;
    statusPedido: string;
    pago: boolean = true;
    itensVenda: Array<ItensVenda> = [];
}