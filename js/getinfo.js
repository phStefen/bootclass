function setInfo(nome, user, bio, perfil, cargo, lembrar) {
     console.log(lembrar);
     localStorage.setItem('user', user);
     if (lembrar) {
          localStorage.setItem('nome', nome);
          localStorage.setItem('bio', bio)
          localStorage.setItem('perfil', perfil);
          localStorage.setItem('cargo', cargo);
          localStorage.setItem('lembrar', true);
     } else {
          sessionStorage.setItem('nome', nome);
          sessionStorage.setItem('bio', bio)
          sessionStorage.setItem('perfil', perfil);
          sessionStorage.setItem('cargo', cargo);
          localStorage.setItem('lembrar', false);
     }
}

function getInfo() {
     var lembrar = localStorage.getItem('lembrar');
     if (lembrar === 'true') {
          return {
               user: localStorage.getItem('user'),
               nome: localStorage.getItem('nome'),
               bio: localStorage.getItem('bio'),
               perfil: localStorage.getItem('perfil'),
               cargo: localStorage.getItem('cargo'),
          }
     }
     else {
          return {
               user: localStorage.getItem('user'),
               nome: sessionStorage.getItem('nome'),
               bio: sessionStorage.getItem('bio'),
               perfil: sessionStorage.getItem('perfil'),
               cargo: sessionStorage.getItem('cargo'),
          }
     }
}

function getOtherInfo() {
     return {
          user: sessionStorage.getItem('otheruser'),
          nome: sessionStorage.getItem('othernome'),
          bio: sessionStorage.getItem('otherbio'),
          perfil: sessionStorage.getItem('otherperfil'),
          cargo: sessionStorage.getItem('othercargo'),
     }
}

function setOtherInfo(user, nome, bio, perfil, cargo){
     sessionStorage.setItem('otheruser', user);
     sessionStorage.setItem('othernome', nome)
     sessionStorage.setItem('otherbio', bio);
     sessionStorage.setItem('otherperfil', perfil);
     sessionStorage.setItem('othercargo', cargo);
}

function clearInfo() {
     localStorage.setItem('nome', '');
     localStorage.setItem('bio', '')
     localStorage.setItem('perfil', '');
     localStorage.setItem('cargo', '');
     localStorage.setItem('lembrar', false);
     window.location.href = 'index.html'
}

function setPerfil(perfil) {
     if (localStorage.getItem('lembrar') === 'true')
          localStorage.setItem('perfil', perfil);
     else
          sessionStorage.setItem('perfil', perfil);
}