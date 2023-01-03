package io.github.joelytonneto.systock.rest.dto;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FiltroListVendaDTO {
	private Date periodoInicial;
	
	private Date periodoFinal;
}
