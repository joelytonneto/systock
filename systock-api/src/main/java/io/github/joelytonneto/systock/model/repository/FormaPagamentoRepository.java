package io.github.joelytonneto.systock.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.joelytonneto.systock.model.entity.FormaPagamento;

public interface FormaPagamentoRepository extends JpaRepository<FormaPagamento, Integer> {
}