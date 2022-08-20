package io.github.joelytonneto.systock.model.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Produto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false, length = 15)
	@NotEmpty(message = "{campo.produto.ean.obrigatorio}")
	private String codigoEan;
	
	@Column(nullable = false)
	@NotEmpty(message = "{campo.produto.descricao.obrigatorio}")
	private String descricao;
	
	@Column(nullable = false, length = 10)
	private String tipo;
	
	@Column(nullable = false)
	@DecimalMin(value = "0", message = "{campo.produto.precocusto.obrigatorio}")
	private double precoCusto;
	
	@Column(nullable = false)
	@DecimalMin(value = "0", message = "{campo.produto.precovenda.obrigatorio}")
	private double precoVenda;
	
	@Column(nullable = false)
	@DecimalMin(value = "0", message = "{campo.produto.estoque.obrigatorio}")
	private double estoque;
	
	@Column(nullable = false)
	private boolean ativo;
	
	@Column(columnDefinition="TEXT")
	private String observacao;
	
	@Column(name = "data_cadastro", updatable = false)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCadastro;

    @PrePersist
    public void prePersist(){
        setDataCadastro(LocalDate.now());
    }
}
