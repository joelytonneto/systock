package io.github.joelytonneto.systock.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.github.joelytonneto.systock.model.entity.Pagamento;
import io.github.joelytonneto.systock.model.repository.PagamentoRepository;

@RestController
@RequestMapping("/api/pagamentos")
public class PagamentoController {

    private final PagamentoRepository repository;

    @Autowired
    public PagamentoController(PagamentoRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping
    public List<Pagamento> getPagamentosByIdVenda(@RequestParam(value = "idVenda", required = true) Integer idVenda) {
    	return repository.findByIdPagamentoVenda(idVenda);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pagamento salvar( @RequestBody @Valid Pagamento pagamento ){
        return repository.save(pagamento);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar( @PathVariable Integer id ){
        repository
            .findById(id)
            .map( pagamento -> {
                repository.delete(pagamento);
                return Void.TYPE;
            })
            .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pagamento não encontrado") );
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar( @PathVariable Integer id,
                           @RequestBody @Valid Pagamento pagamentoAtualizado ) {
        repository
                .findById(id)
                .map( pagamento -> {
                	pagamento.setDataPagamento(pagamentoAtualizado.getDataPagamento());
                	pagamento.setFormaPagamento(pagamentoAtualizado.getFormaPagamento());
                	pagamento.setValor(pagamentoAtualizado.getValor());
                	pagamento.setVenda(pagamentoAtualizado.getVenda());
                    return repository.save(pagamento);
                })
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pagamento não encontrado") );
    }
}
