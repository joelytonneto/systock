package io.github.joelytonneto.systock.rest.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import io.github.joelytonneto.systock.model.entity.Cliente;
import io.github.joelytonneto.systock.model.entity.ItensVenda;
import io.github.joelytonneto.systock.model.entity.Pagamento;

@Data
@NoArgsConstructor
public class VendaDTO {
	private Integer idCliente;
	
    @NotEmpty(message = "{campo.data.obrigatorio}")
    private String dataVenda;
	
	@NotEmpty(message = "{campo.valor.bruto.obrigatorio}")
	private String valorBruto;
	
	@NotEmpty(message = "{campo.desconto.obrigatorio}")
	private String desconto;
	
	@NotEmpty(message = "{campo.valor.liquido.obrigatorio}")
	private String valorLiquido;
	
	@NotEmpty(message = "{campo.valor.pago.obrigatorio}")
	private String valorPago;
	
	@NotEmpty(message = "{campo.valor.troco.obrigatorio}")
	private String troco;
	
	@NotNull(message = "{campo.entregador.obrigatorio}")
	private Integer idEntregador;
	
	@NotEmpty(message = "{campo.taxa.entrega.obrigatorio}")
	private String taxaEntrega;
    
    private String observacao;
    
    @NotEmpty(message = "{campo.status.pedido.obrigatorio}")
    private String statusPedido;    
	
    private boolean pago;
    
    private List<ItensVenda> itensVenda;
    
    private List<Pagamento> pagamentosVenda;
    
    private Cliente enderecoVenda;

}
