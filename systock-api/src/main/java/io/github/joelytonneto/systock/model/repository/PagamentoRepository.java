package io.github.joelytonneto.systock.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.github.joelytonneto.systock.model.entity.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Integer> {
	
	@Query(" select p from Pagamento p" +
            " where id_venda=:idVenda")
    List<Pagamento> findByIdPagamentoVenda(@Param("idVenda") Integer idVenda);
}