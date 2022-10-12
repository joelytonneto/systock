package io.github.joelytonneto.systock.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotEmpty;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
public class Venda {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "id_cliente")
	private Cliente cliente;	
	
	@Column(name = "data_venda")
	@JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataVenda;
	
	@Column(nullable = false)
	@DecimalMin(value = "0", message = "{campo.valor.bruto.obrigatorio}")
	private BigDecimal valorBruto;
	
	@Column(nullable = false)
	@DecimalMin(value = "0", message = "{campo.desconto.obrigatorio}")
	private BigDecimal desconto;
	
	@Column(nullable = false)
	@DecimalMin(value = "0", message = "{campo.valor.liquido.obrigatorio}")
	private BigDecimal valorLiquido;
	
	@Column
	@DecimalMin(value = "0", message = "{campo.valor.pago.obrigatorio}")
	private BigDecimal valorPago;
	
	@Column
	@DecimalMin(value = "0", message = "{campo.valor.troco.obrigatorio}")
	private BigDecimal troco;
	
	@ManyToOne
	@JoinColumn(name = "id_entregador")
	private Entregador entregador;
	
	@Column
	@DecimalMin(value = "0", message = "{campo.taxa.entrega.obrigatorio}")
	private BigDecimal taxaEntrega;	
	
	@Column(columnDefinition="TEXT")
	private String observacao;	
	
	@Column(nullable = false, length = 50)    
    @NotEmpty(message = "{campo.status.pedido.obrigatorio}")    
	private String statusPedido;
	
	@Column(nullable = false)
	private boolean pago;

}