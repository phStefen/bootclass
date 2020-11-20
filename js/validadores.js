function cpfValido() {
     var soma = 0;
     var resto;

     cpf = cpf.replace(/[\s.-]*/igm, '');
     if (cpf.length !== 11 || !Array.from(cpf).filter(e => e !== cpf[0]).length) {
          criarToast('Aviso', 'CPF Inválido!', 'danger');
          return false
     }

     for (i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
     resto = (soma * 10) % 11;

     if ((resto == 10) || (resto == 11)) resto = 0;
     if (resto != parseInt(cpf.substring(9, 10))) {
          criarToast('Aviso', 'CPF Inválido!', 'danger');
          return false;
     }

     soma = 0;
     for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
     resto = (soma * 10) % 11;

     if ((resto == 10) || (resto == 11)) resto = 0;
     if (resto != parseInt(cpf.substring(10, 11))) {
          criarToast('Aviso', 'CPF Inválido!', 'danger');
          return false;
     }
     return true;
}

function emailValido() {
     const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

     if (!re.test(email)) {
          criarToast('Aviso', 'E-mail Inválido!', 'danger');
          return false;
     }
     return true;
}
