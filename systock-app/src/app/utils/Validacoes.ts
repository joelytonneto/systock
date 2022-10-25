import { AbstractControl } from '../../../node_modules/@angular/forms';
import { cpf } from 'cpf-cnpj-validator'; 

export class Validacoes {
  static Validacpf(controle: AbstractControl) {
    const cpfForm = controle.value;

    let valido: boolean;

    valido = cpf.isValid(cpfForm);

    if(cpfForm) {
        if (valido) {
            return null;
        } else {
            return { cpfInvalido: valido };
        }
    } else {
        return null;
    }

  }

  static MaiorQue18Anos(controle: AbstractControl) {
    const nascimento = controle.value;
    const [ano, mes, dia] = nascimento.split('-');
    const hoje = new Date();
    const dataNascimento = new Date(ano, mes, dia, 0, 0, 0);
    const tempoParaTeste = 1000 * 60 * 60 * 24 * 365 * 18; //18 anos em mili segundos...

    if (hoje.getTime() - dataNascimento.getTime() >= tempoParaTeste)
      return null;

    return { menorDeIdade: true };
  }

  static SenhasCombinam(controle: AbstractControl) {
    let senha = controle.get('senha').value;
    let confirmarSenha = controle.get('confirmarSenha').value;

    if (senha === confirmarSenha) return null;

    controle.get('confirmarSenha').setErrors({ senhasNaoCoincidem: true });
  }
}