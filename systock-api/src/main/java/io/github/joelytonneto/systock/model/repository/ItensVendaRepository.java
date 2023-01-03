package io.github.joelytonneto.systock.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.github.joelytonneto.systock.model.entity.ItensVenda;

public interface ItensVendaRepository extends JpaRepository<ItensVenda, Integer> {
	
    @Query(" select i from ItensVenda i join i.venda v " +
            " where v.id = ( :id ) ")
    List<ItensVenda> findByIdList(@Param("id") Integer id);
    
}