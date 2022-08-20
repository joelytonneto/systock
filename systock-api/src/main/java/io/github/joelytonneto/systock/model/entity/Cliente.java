package io.github.joelytonneto.systock.model.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.br.CPF;

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
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 150)
    @NotEmpty(message = "{campo.nome.obrigatorio}")
    private String nome;
    
    @Column(nullable = true, length = 11)    
    @CPF(message = "{campo.cpf.invalido}")
    private String cpf;
    
    @Column(nullable = true, length = 10)    
    private String dataNascimento;
    
    @Column(nullable = false, length = 14)
    @NotEmpty(message = "{campo.celular.obrigatorio}")
    private String celular;    
    
    @Column(nullable = true, length = 9)    
    private String cep;
    
    @Column(nullable = false, length = 300)    
    @NotEmpty(message = "{campo.endereco.obrigatorio}")
    private String endereco;
    
    @Column(nullable = false, length = 10)    
    @NotEmpty(message = "{campo.numero.obrigatorio}")
    private String numero;
    
    @Column(nullable = true, length = 300)    
    private String complemento;
    
    @Column(nullable = false, length = 100)    
    @NotEmpty(message = "{campo.bairro.obrigatorio}")
    private String bairro;
    
    @Column(nullable = true, length = 100)    
    private String cidade;
    
    @Column(nullable = true, length = 2)    
    private String uf;
    
    @Column(nullable = false)    
    private boolean ativo;
    
    @Column(columnDefinition="TEXT")    
    private String observacoes;    

    @Column(name = "data_cadastro", updatable = false)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCadastro;

    @PrePersist
    public void prePersist(){
        setDataCadastro(LocalDate.now());
    }
}
