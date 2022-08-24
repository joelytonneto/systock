package io.github.joelytonneto.systock.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.github.joelytonneto.systock.model.entity.Entregador;
import io.github.joelytonneto.systock.model.repository.EntregadorRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/entregadores")
public class EntregadorController {

    private final EntregadorRepository repository;

    @Autowired
    public EntregadorController(EntregadorRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Entregador> obterTodos(){
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Entregador salvar( @RequestBody @Valid Entregador entregador ){
        return repository.save(entregador);
    }

    @GetMapping("{id}")
    public Entregador acharPorId( @PathVariable Integer id ){
        return repository
                .findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Entregador não encontrado") );
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar( @PathVariable Integer id ){
        repository
            .findById(id)
            .map( entregador -> {
                repository.delete(entregador);
                return Void.TYPE;
            })
            .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Entregador não encontrado") );
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar( @PathVariable Integer id,
                           @RequestBody @Valid Entregador entregadorAtualizado ) {
        repository
                .findById(id)
                .map( entregador -> {
                    entregador.setNome(entregadorAtualizado.getNome());
                    entregador.setAtivo(entregadorAtualizado.isAtivo());                   
                    return repository.save(entregador);
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Entregador não encontrado") );
    }
}
