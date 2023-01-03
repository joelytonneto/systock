package io.github.joelytonneto.systock.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.github.joelytonneto.systock.model.entity.Cliente;
import io.github.joelytonneto.systock.model.entity.Entregador;
import io.github.joelytonneto.systock.model.entity.ItensVenda;
import io.github.joelytonneto.systock.model.entity.Pagamento;
import io.github.joelytonneto.systock.model.entity.Produto;
import io.github.joelytonneto.systock.model.entity.ServicoPrestado;
import io.github.joelytonneto.systock.model.entity.Venda;
import io.github.joelytonneto.systock.model.repository.ClienteRepository;
import io.github.joelytonneto.systock.model.repository.EntregadorRepository;
import io.github.joelytonneto.systock.model.repository.ItensVendaRepository;
import io.github.joelytonneto.systock.model.repository.PagamentoRepository;
import io.github.joelytonneto.systock.model.repository.VendaRepository;
import io.github.joelytonneto.systock.rest.dto.VendaDTO;
import io.github.joelytonneto.systock.util.BigDecimalConverter;

import javax.print.DocFlavor;
import javax.print.DocPrintJob;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import javax.print.SimpleDoc;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.standard.JobName;
import javax.print.attribute.standard.MediaSizeName;
import javax.print.attribute.standard.OrientationRequested;
import javax.swing.JOptionPane;
import javax.transaction.Transactional;
import javax.validation.Valid;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/vendas")
@RequiredArgsConstructor
@Transactional
public class VendaController  {

    private final ClienteRepository clienteRepository;
    private final EntregadorRepository entregadorRepository;
    private final VendaRepository vendaRepository;
    private final ItensVendaRepository itensVendaRepository;
    private final PagamentoRepository pagamentoRepository;
    
    private final BigDecimalConverter bigDecimalConverter;
    
    @GetMapping("{id}")
    public Venda getById( @PathVariable Integer id ){
        return vendaRepository
                .findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venda não encontrada") );
    }
    
    @GetMapping
    public List<Venda> getVendasFiltro(
    		@RequestParam(value = "periodoInicial", required = true) Date periodoInicial,
    		@RequestParam(value = "periodoFinal", required = true) Date periodoFinal
    ) {
    	return vendaRepository.findByPeriodoVendas(periodoInicial, periodoFinal);
    }
    
//    @GetMapping
//	public List<Venda> obterTodos(){
//    	String textoImpressora = 
//      		  "------------------------------------------------\n\r"
//              + "                CUPOM NAO FISCAL                \n\r"
//              + "                                                \n\r"                
//              + "                                                \n\r"
//              + "------------------------------------------------\n\r"
//              + "# | COD| DESC| QTD| VL UN R$|   VL TOTAL ITEM   \n\r"
//              + "------------------------------------------------\n\r"
//              + "------------------------------------------------\n\r"
//              + "                CUPOM NAO FISCAL                \n\r"
//              + "                                                \n\r"                
//              + "                                                \n\r"
//              + "------------------------------------------------\n\r"
//              + "# | COD| DESC| QTD| VL UN R$|   VL TOTAL ITEM   \n\r"
//              + "------------------------------------------------\n\r"
//              + "------------------------------------------------\n\r"
//              + "                CUPOM NAO FISCAL                \n\r"
//              + "                                                \n\r"                
//              + "                                                \n\r"
//              + "------------------------------------------------\n\r"
//              + "# | COD| DESC| QTD| VL UN R$|   VL TOTAL ITEM   \n\r"
//              + "------------------------------------------------\n\r"
//              + (char) 27 + (char) 109 + "";
//      
//    	this.imprimirPedido(textoImpressora);      
//		return vendaRepository.findAll();
//	}

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Venda salvar( @RequestBody @Valid VendaDTO dto ){
        LocalDate data = LocalDate.parse(dto.getDataVenda(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        Integer idCliente = dto.getIdCliente();
        Integer idEntregador = dto.getIdEntregador();
        
        Cliente cliente;
        if(idCliente != null) {
        	cliente = clienteRepository
                            .findById(idCliente)
                            .orElseThrow(() ->
                                    new ResponseStatusException(
                                            HttpStatus.BAD_REQUEST, "Cliente inexistente."));        	
        } else {
        	cliente = null;
        }        
        
        Entregador entregador =
                entregadorRepository
                        .findById(idEntregador)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.BAD_REQUEST, "Entregador inexistente."));
        
        

        Venda venda = new Venda();
        venda.setCliente(cliente);
        venda.setDataVenda(data);
        venda.setValorBruto(bigDecimalConverter.converter(dto.getValorBruto()));
        venda.setDesconto(bigDecimalConverter.converter(dto.getDesconto()));
        venda.setValorLiquido(bigDecimalConverter.converter(dto.getValorLiquido()));
        venda.setValorPago(bigDecimalConverter.converter(dto.getValorPago()));
        venda.setTroco(bigDecimalConverter.converter(dto.getTroco()));
        venda.setEntregador(entregador);
        venda.setTaxaEntrega(bigDecimalConverter.converter(dto.getTaxaEntrega()));
        venda.setObservacao(dto.getObservacao());
        venda.setStatusPedido(dto.getStatusPedido());
        venda.setPago(dto.isPago());
        
        vendaRepository.save(venda);
        
        List<ItensVenda> itensVenda = dto.getItensVenda();
        
        itensVenda.forEach(item -> {
    		ItensVenda iteVda = new ItensVenda();
    		iteVda.setDataRegistro(item.getDataRegistro());
    		iteVda.setQuantidade(item.getQuantidade());
    		iteVda.setValor(item.getValor());
    		iteVda.setProduto(item.getProduto());
    		iteVda.setVenda(venda);    		    		
    		itensVendaRepository.save(iteVda);
    	});
        
        List<Pagamento> pagamentosVenda = dto.getPagamentosVenda();
        
        if(dto.isPago()) {
        	pagamentosVenda.forEach(item -> {
        		Pagamento pagamentoVda = new Pagamento();
        		pagamentoVda.setVenda(venda);
        		pagamentoVda.setFormaPagamento(item.getFormaPagamento());
        		pagamentoVda.setValor(item.getValor());
        		pagamentoRepository.save(pagamentoVda);
        	});        	
        }
        
        return venda;
    }  
    
    private void imprimirPedido(String pTexto) {
        try {
            InputStream prin = new ByteArrayInputStream(pTexto.getBytes());
            DocFlavor docFlavor = DocFlavor.INPUT_STREAM.AUTOSENSE;
            SimpleDoc documentoTexto = new SimpleDoc(prin, docFlavor, null);
            PrintService[] impressora = PrintServiceLookup.lookupPrintServices(docFlavor, null);
            // pega a //impressora padrão
            PrintRequestAttributeSet printerAttributes = new HashPrintRequestAttributeSet();
            printerAttributes.add(new JobName("Impressao", null));
            printerAttributes.add(OrientationRequested.PORTRAIT);
            printerAttributes.add(MediaSizeName.ISO_A4);
            // informa o tipo da folha            
            for (PrintService p : impressora) {
                DocPrintJob printJob = p.createPrintJob();
                try {
                    if (p.getName().contains("PRODUCAO")) {
                        printJob.print(documentoTexto, (PrintRequestAttributeSet) printerAttributes);
                        //tenta imprimir
                    }
                } catch (Exception e) {
                    JOptionPane.showMessageDialog(null, "Não foi possível realizar a impressão !!", "Erro", JOptionPane.ERROR_MESSAGE);
                    // mostra //mensagem de erro
                }
            }

            prin.close();

        } catch (Exception e) {

        }
    }

//    @GetMapping
//    public List<Venda> pesquisar(
//            @RequestParam(value = "nome", required = false, defaultValue = "") String nome,
//            @RequestParam(value = "mes", required = false) Integer mes
//    ) {
//        return vendaRepository.findByNomeClienteAndMes("%" + nome + "%", mes);
//    }
}
