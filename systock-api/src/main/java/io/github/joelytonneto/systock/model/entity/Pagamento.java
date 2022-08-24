package io.github.joelytonneto.systock.model.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.validation.constraints.DecimalMin;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Entity
@Data
public class Pagamento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "id_venda")
	private Venda venda;
	
	@ManyToOne
	@JoinColumn(name = "id_forma_pagamento")
	private FormaPagamento formaPagamento;
	
	@Column(nullable = false)
	@DecimalMin(value = "0", message = "{campo.pagamento.valor.obrigatorio}")
	private BigDecimal valor;
	
	@Column(name = "data_pagamento", updatable = false)
	@JsonFormat(pattern = "dd/MM/yyyy - HH:MM:SS")
    private LocalDate dataPagamento;

    @PrePersist
    public void prePersist(){
        setDataPagamento(LocalDate.now());
    }

}
