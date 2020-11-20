function cpfValido() {
     var soma = 0;
     var resto = 0;

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

function cnpjValido() {
     cnpj = cnpj.replace(/[\s./-]*/igm, '');

     if (cnpj.length !== 14 || !Array.from(cnpj).filter(e => e !== cnpj[0]).length) {
          criarToast('Aviso', 'CNPJ Inválido!', 'danger');
          return false
     }

     const calc = (x) => {
          const slice = cnpj.slice(0, x)
          let factor = x - 7
          let sum = 0

          for (let i = x; i >= 1; i--) {
               const n = slice[x - i]
               sum += n * factor--
               if (factor < 2) factor = 9
          }

          const result = 11 - (sum % 11)

          return result > 9 ? 0 : result
     }

     const digits = cnpj.slice(12)
     console.log(digits);

     const digit0 = calc(12)
     if (digit0 !== Number(digits[0])) {
          criarToast('Aviso', 'CNPJ Inválido!', 'danger');
          return false
     }

     const digit1 = calc(13)
     if (digit1 !== Number(digits[1])) {
          criarToast('Aviso', 'CNPJ Inválido!', 'danger');
          return false
     }

     return true
}


function emailValido() {
     const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

     if (!re.test(email)) {
          criarToast('Aviso', 'E-mail Inválido!', 'danger');
          return false;
     }
     return true;
}
