import { Produto } from "src/app/produtos/produto";
import { Venda } from "../venda";

export class ItensVenda {

    id: number;
    venda: Venda;
    produto: Produto;
    valor: number;
    quantidade: number;
    dataRegistro: Date;
    
}