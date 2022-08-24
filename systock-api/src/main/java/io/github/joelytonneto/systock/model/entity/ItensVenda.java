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
public class ItensVenda {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "id_venda")
	private Venda venda;
	
	@ManyToOne
	@JoinColumn(name = "id_produto")
	private Produto produto;
	
	@Column(nullable = false)
	@DecimalMin(value = "0", message = "{campo.itens.venda.valor.obrigatorio}")
	private BigDecimal valor;
	
	@Column(nullable = false)
	@DecimalMin(value = "0", message = "{campo.quantidade.obrigatorio}")
	private Double quantidade;
	
	@Column(name = "data_registro", updatable = false)
	@JsonFormat(pattern = "dd/MM/yyyy - HH:MM:SS")
    private LocalDate dataRegistro;

    @PrePersist
    public void prePersist(){
        setDataRegistro(LocalDate.now());
    }

}