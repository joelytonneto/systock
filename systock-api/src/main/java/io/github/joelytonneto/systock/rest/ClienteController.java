package io.github.joelytonneto.systock.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.github.joelytonneto.systock.model.entity.Cliente;
import io.github.joelytonneto.systock.model.repository.ClienteRepository;

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
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteRepository repository;

    @Autowired
    public ClienteController(ClienteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Cliente> obterTodos(){    	
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente salvar( @RequestBody @Valid Cliente cliente ){
        return repository.save(cliente);
    }

    @GetMapping("{id}")
    public Cliente acharPorId( @PathVariable Integer id ){
        return repository
                .findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado") );
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar( @PathVariable Integer id ){
        repository
            .findById(id)
            .map( cliente -> {
                repository.delete(cliente);
                return Void.TYPE;
            })
            .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado") );
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar( @PathVariable Integer id,
                           @RequestBody @Valid Cliente clienteAtualizado ) {
        repository
                .findById(id)
                .map( cliente -> {
                    cliente.setNome(clienteAtualizado.getNome());
                    cliente.setCpf(clienteAtualizado.getCpf());
                    cliente.setDataNascimento(clienteAtualizado.getDataNascimento());
                    cliente.setCelular(clienteAtualizado.getCelular());
                    cliente.setCep(clienteAtualizado.getCep());
                    cliente.setEndereco(clienteAtualizado.getEndereco());
                    cliente.setNumero(clienteAtualizado.getNumero());
                    cliente.setComplemento(clienteAtualizado.getComplemento());
                    cliente.setBairro(clienteAtualizado.getBairro());
                    cliente.setCidade(clienteAtualizado.getCidade());
                    cliente.setUf(clienteAtualizado.getUf());
                    cliente.setAtivo(clienteAtualizado.isAtivo());                    
                    return repository.save(cliente);
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado") );
    }
}
