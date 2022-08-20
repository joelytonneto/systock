package io.github.joelytonneto.systock.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.github.joelytonneto.systock.model.entity.Produto;
import io.github.joelytonneto.systock.model.repository.ProdutoRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {
	
	private final ProdutoRepository repository;
	
	@Autowired
	public ProdutoController(ProdutoRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping
	public List<Produto> obterTodos(){
		return repository.findAll();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Produto salvar(@RequestBody @Valid Produto produto) {
		return repository.save(produto);		
	}
	
	@GetMapping("{id}")
	public Produto buscarPorId(@PathVariable Integer id) {
		return repository
				.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));
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
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void atualizar(@PathVariable Integer id,
						  @RequestBody @Valid Produto produtoAtualizado) {
		repository
			.findById(id)
			.map(produto -> {
				produto.setCodigoEan(produtoAtualizado.getCodigoEan());
				produto.setDescricao(produtoAtualizado.getDescricao());
				produto.setTipo(produtoAtualizado.getTipo());
				produto.setPrecoCusto(produtoAtualizado.getPrecoCusto());
				produto.setPrecoVenda(produtoAtualizado.getPrecoVenda());
				produto.setEstoque(produtoAtualizado.getEstoque());
				produto.setAtivo(produtoAtualizado.isAtivo());
				produto.setObservacao(produtoAtualizado.getObservacao());
				return repository.save(produto);
			})
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));
	}

}
