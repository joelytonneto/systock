import { FormaPagamento } from "src/app/formas-pagamentos/formaPagamento";
import { Venda } from "../venda";

export class Pagamento {

    id: number;
    venda: Venda;
    formaPagamento: FormaPagamento;
    valor: number;
    dataPagamento: Date;
    
}