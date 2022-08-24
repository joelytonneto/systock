package io.github.joelytonneto.systock.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.joelytonneto.systock.model.entity.Venda;

public interface VendaRepository extends JpaRepository<Venda, Integer> {
}