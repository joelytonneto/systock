package io.github.joelytonneto.systock.model.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.github.joelytonneto.systock.model.entity.Venda;

public interface VendaRepository extends JpaRepository<Venda, Integer> {
	
	@Query(" select v from Venda v join v.cliente c " +
            " where upper( c.nome ) like upper( :nome ) and MONTH(v.dataVenda) =:mes    ")
    List<Venda> findByNomeClienteAndMes(
            @Param("nome") String nome, @Param("mes") Integer mes);
	
    @Query(" select v from Venda v" +
            " where data_venda between :periodoInicial and :periodoFinal order by data_venda asc")
    List<Venda> findByPeriodoVendas(
            @Param("periodoInicial") Date periodoInicial, @Param("periodoFinal") Date periodoFinal);
	
//	Venda findTopByOrderByIdDesc(); //Pegar Última Transação Incluída na Tabela
}