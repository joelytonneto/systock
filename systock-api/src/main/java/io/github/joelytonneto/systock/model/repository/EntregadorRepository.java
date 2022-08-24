package io.github.joelytonneto.systock.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.joelytonneto.systock.model.entity.Entregador;

public interface EntregadorRepository extends JpaRepository<Entregador, Integer> {
}