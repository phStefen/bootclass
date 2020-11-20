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

function setPerfil(perfil){
     if(localStorage.getItem('lembrar') === 'true')
          localStorage.setItem('perfil', perfil);
     else
          sessionStorage.setItem('perfil', perfil);
}