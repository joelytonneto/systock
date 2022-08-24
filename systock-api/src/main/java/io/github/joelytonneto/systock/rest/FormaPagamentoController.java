package io.github.joelytonneto.systock.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.github.joelytonneto.systock.model.entity.FormaPagamento;
import io.github.joelytonneto.systock.model.repository.FormaPagamentoRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/formas-pagamentos")
public class FormaPagamentoController {

    private final FormaPagamentoRepository repository;

    @Autowired
    public FormaPagamentoController(FormaPagamentoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<FormaPagamento> obterTodos(){
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FormaPagamento salvar( @RequestBody @Valid FormaPagamento formaPagamento ){
        return repository.save(formaPagamento);
    }

    @GetMapping("{id}")
    public FormaPagamento acharPorId( @PathVariable Integer id ){
        return repository
                .findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Forma de Pagamento não encontrada") );
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar( @PathVariable Integer id ){
        repository
            .findById(id)
            .map( formaPagamento -> {
                repository.delete(formaPagamento);
                return Void.TYPE;
            })
            .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Forma de Pagamento não encontrada") );
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar( @PathVariable Integer id,
                           @RequestBody @Valid FormaPagamento formaPagamentoAtualizada ) {
        repository
                .findById(id)
                .map( formaPagamento -> {
                	formaPagamento.setDescricao(formaPagamentoAtualizada.getDescricao());
                	formaPagamento.setAtivo(formaPagamentoAtualizada.isAtivo());
                    return repository.save(formaPagamento);
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Forma de Pagamento não encontrada") );
    }
}
