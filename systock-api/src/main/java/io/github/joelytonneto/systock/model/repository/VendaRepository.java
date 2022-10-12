package io.github.joelytonneto.systock.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.github.joelytonneto.systock.model.entity.ServicoPrestado;
import io.github.joelytonneto.systock.model.entity.Venda;

public interface VendaRepository extends JpaRepository<Venda, Integer> {
	
	@Query(" select v from Venda v join v.cliente c " +
            " where upper( c.nome ) like upper( :nome ) and MONTH(v.dataVenda) =:mes    ")
    List<Venda> findByNomeClienteAndMes(
            @Param("nome") String nome, @Param("mes") Integer mes);
	
	Venda findTopByOrderByIdDesc();
}