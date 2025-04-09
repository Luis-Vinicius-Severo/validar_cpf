export default class ValidarCpf {
  constructor(element) {
    this.element = element;
  }

  limpar(cpf) {
    return cpf.replace(/\D/g, '');
  }

  contruir(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  formatar(cpf) {
    const cpfLimpar = this.limpar(cpf);
    return this.contruir(cpfLimpar);
  }

  validar(cpf) {
    const matchCpf = cpf.match(/(?:\d{3}[-.\s]?){3}\d{2}/g);
    return matchCpf && matchCpf[0] === cpf;
  }

  validarMundanca(cpfElement) {
    if (this.validar(cpfElement.value)) {
      cpfElement.value = this.formatar(cpfElement.value);
      cpfElement.classList.remove('erro');
      cpfElement.classList.add('valido');
      cpfElement.nextElementSibling.classList.remove('ativar');
    } else {
      cpfElement.classList.add('erro');
      cpfElement.classList.remove('valido');
      cpfElement.nextElementSibling.classList.add('ativar');
    }
  }

  adicionarEvento() {
    this.element.addEventListener('change', () => {
      this.validarMundanca(this.element);
    });
  }

  adicionarErroSpan() {
    const erroElement = document.createElement('span');
    erroElement.classList.add('erro-text');
    erroElement.innerText = 'CPF inválido';
    this.element.parentElement.insertBefore(
      erroElement,
      this.element.nextElementSibling,
    );
  }

  inicar() {
    this.adicionarEvento();
    this.adicionarErroSpan();
    return this;
  }
}
