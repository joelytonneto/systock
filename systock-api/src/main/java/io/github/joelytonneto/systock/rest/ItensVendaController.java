package io.github.joelytonneto.systock.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.github.joelytonneto.systock.model.entity.ItensVenda;
import io.github.joelytonneto.systock.model.repository.ItensVendaRepository;

import javax.swing.JOptionPane;
import javax.validation.Valid;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.List;
import java.util.Scanner;

@RestController
@RequestMapping("/api/itens-venda")
public class ItensVendaController {
	
	private final ItensVendaRepository repository;
	
	@Autowired
	public ItensVendaController(ItensVendaRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("{id}")
	public List<ItensVenda> obterTodos(@PathVariable Integer id){
		return repository.findByIdList(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ItensVenda salvar(@RequestBody @Valid ItensVenda itensVenda) {
		return repository.save(itensVenda);		
	}
	
	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletar(@PathVariable Integer id) {
		repository
			.findById(id)
			.map(produto -> {
				repository.delete(produto);
				return Void.TYPE;
			})
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));
	}

}