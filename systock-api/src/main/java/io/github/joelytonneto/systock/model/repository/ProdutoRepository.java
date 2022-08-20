package io.github.joelytonneto.systock.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.joelytonneto.systock.model.entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
}