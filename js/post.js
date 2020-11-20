function gerarPost(id, user, nome, data, texto, likes, comentarios, perfil) {
  if (!perfil)
    perfil = 'img/perfil.svg';
  return `
  <div class="card mt-5" id="${id}">
      <div class="container">
            <div class="row card-header bg-white">
                <div class="col-auto">
                      <img src="${perfil}" height="40" width="40" class="rounded-circle">
                </div>
                <div class="col">
                      <strong class="nome">${nome}</strong>
                      <span class="user">${user}</span>
                      <span class="float-right">${data}</span>
                </div>
            </div>

            <div class="card-body text-justify">
                ${texto}
            </div>

            <div class="row text-center card-footer">
                <div class="col">
                      <a class="icon icon-comentar" data-toggle="modal" data-target="#modalComentario" data-comment="${id}"></a>
                      <span class="badge badge-pill badge-primary comentarios">${comentarios}</span>
                </div>
                <div class="col">
                      <span class="icon icon-curti" data onclick="curtir('${id}', this)"></span>
                      <span class="badge badge-pill badge-primary likes">${likes}</span>
                </div>
                <div class="col">
                      <span class="icon icon-compartilhar" onclick="console(this)"></span>
                      <span class="badge badge-pill badge-primary compartilhar">0</span>
                </div>
            </div>
      </div>
  </div>
  `
}

function gerarComentario(nome, user, texto, perfil) {
  if (!perfil)
    perfil = 'img/perfil.svg';
  return `
    <div class="row my-3">
      <div class="col-auto"><img src="${perfil}" alt="" width="40" height="40" class="rounded-circle"></div>
        <div class="col">
          <div class="bg-light px-4 py-2 rounded">
          <p><span class="lead">${nome}</span> @${user}</p>
          <p class="text-justify">
            ${texto}
          </p>
        </div>
      </div>
    </div>
    `
}

//Funções dos Post
function publicar() {
  post = $('#publicagem').val();

  if (post !== '') {
    post = firebase.database().ref('postagens/').push({
      user: user,
      nome: nome,
      texto: post,
      data: data,
      likes: 0,
      comentarios: 0,
      perfil: localStorage.getItem('perfil')
    }).key;

    firebase.database().ref('usuarios/' + user + '/postagens').push(post);

    criarToast('Aviso', 'Postagem Feita!', 'success');
    $('#publicagem').val('');
  }
}

function comentar(id) {
  id = $(id).data('value');
  post = $('#comentario').val();

  if (post !== '') {
    firebase.database().ref('comentarios/' + id).push({
      user: user,
      nome: nome,
      texto: post,
      data: data,
      perfil: localStorage.getItem('perfil')
    });

    let comentarios = Number($('div#' + id + ' span.comentarios').text());

    firebase.database().ref('postagens/' + id + '/comentarios').set(comentarios + 1);
    criarToast('Aviso', 'Comentário Feito!', 'success');
    $('#comentario').val('');
  }
}

function curtir(id, icon) {
  let span = $('#' + id + " .likes");
  let likes = Number($(span).text());

  if ($(icon).hasClass('icon-ativo')) likes--;
  else likes++;

  firebase.database().ref('postagens/' + id + '/likes').set(likes);

  $(icon).toggleClass('icon-ativo');
}


//Carregar Postagens e Comentários
function exclude(key) {
  return key.substring(0, key.length - 1) + String.fromCharCode(key.charCodeAt(key.length - 1) - 1)
}

var postVal = [];
var postKey = [];
var firstKeyPost = "";
function carregarPost() {
  firebase.database().ref('postagens/').orderByKey().limitToLast(5).on('child_added', function (snap, prevChildKey) {
    postVal.unshift(snap.val());
    postKey.unshift(snap.key);
    firstKeyPost = postKey[postKey.length - 1];

    $('#feed').prepend($(gerarPost(snap.key, snap.val().user, snap.val().nome, snap.val().data, snap.val().texto, snap.val().likes, snap.val().comentarios, snap.val().perfil)).hide().fadeIn(1000));
    setListener(snap.key);
  });
}

function carregarMaisPost() {
  postKey = [];
  postVal = [];
  if (firstKeyPost)
    firebase.database().ref('postagens/').orderByKey().endAt(exclude(firstKeyPost)).limitToLast(5).once('value').then((snap) => {
      snap.forEach(childSnap => {
        postVal.unshift(childSnap.val());
        postKey.unshift(childSnap.key);
      });
      firstKeyPost = postKey[postKey.length - 1];
      postVal.forEach((postagem, index) => {
        $('#feed').append($(gerarPost(postKey[index], postagem.user, postagem.nome, postagem.data, postagem.texto, postagem.likes, postagem.comentarios, postagem.perfil)).hide().fadeIn(1000));
        setListener(postKey[index]);
      })

      if (postVal.length < 5)
        firstKeyPost = null;
    });
}

function setListener(id) {
  firebase.database().ref('postagens/' + id).on('value', snapshot => {
    $('#' + id + ' .nome').text(snapshot.val().nome);
    $('#' + id + ' .user').text('@' + snapshot.val().user);
    $('#' + id + ' .likes').text(snapshot.val().likes);
    $('#' + id + ' .comentarios').text(snapshot.val().comentarios);
  });
}

//Carregar Comentários
var commentVal = [];
var commentKey = [];
var firstKeyComment = "";

$('#modalComentario').on('hide.bs.modal', function (event) {
  $('#comment-section').html('');
  commentVal = [];
  commentKey = [];
  firstKeyComment = "";
});

$(document).ready(function () {
  $('textarea').on('keyup keypress', function () {
    $(this).height(0);
    $(this).height(this.scrollHeight);
  });

  $('#modalComentario').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var recipient = button.data('comment')
    var modal = $(this)
    modal.find('.comentario').data('value', recipient)

    firebase.database().ref('comentarios/' + recipient).orderByKey().limitToLast(5).on('child_added', function (snap, prevChildKey) {
      commentVal.unshift(snap.val());
      commentKey.unshift(snap.key);
      firstKeyComment = commentKey[commentKey.length - 1];
      $('#comment-section').prepend($(gerarComentario(snap.val().nome, snap.val().user, snap.val().texto, snap.val().perfil)).hide().fadeIn(1000));
    });
  })
});

function carregarComentarios(id) {
  commentVal = [];
  commentKey = [];
  id = $(id).data('value');

  if (firstKeyComment)
    firebase.database().ref('comentarios/' + id).orderByKey().endAt(exclude(firstKeyComment)).limitToLast(5).once('value').then((snap) => {
      snap.forEach(childSnap => {
        commentVal.unshift(childSnap.val());
        commentKey.unshift(childSnap.key);
      });
      firstKeyComment = commentKey[commentKey.length - 1];
      commentVal.forEach((comentario, index) => {
        $('#comment-section').append($(gerarComentario(comentario.nome, comentario.user, comentario.texto, comentario.perfil)).hide().fadeIn(1000));
      })

      if (commentVal.length < 5)
        firstKeyComment = null;
    });
}

var meuKey = [];
var firstKeyMeu = "";
function carregarMeusPost() {
  firebase.database().ref('usuarios/' + user + '/postagens').orderByKey().limitToLast(5).once('value').then((snap) => {
    snap.forEach(childSnap => {
      meuKey.unshift(childSnap.val());
      carregarMeu(childSnap.val());
    });
    firstKeyMeu = meuKey[meuKey.length - 1];
  })
}

function carregarMeu(id) {
  firebase.database().ref('postagens/' + id).once('value').then(function (snap) {
    $('#feed').prepend($(gerarPost(snap.key, snap.val().user, snap.val().nome, snap.val().data, snap.val().texto, snap.val().likes, snap.val().comentarios)).hide().fadeIn(1000));
    setListener(snap.key);
  });
}

function carregarMeuDnv(id) {
  firebase.database().ref('postagens/' + id).once('value').then(function (snap) {
    $('#feed').append($(gerarPost(snap.key, snap.val().user, snap.val().nome, snap.val().data, snap.val().texto, snap.val().likes, snap.val().comentarios)).hide().fadeIn(1000));
    setListener(snap.key);
  });
}

function carregarMaisMeu() {
  meuKey = [];
  if (firstKeyMeu)
    firebase.database().ref('usuarios/' + user + '/postagens').orderByKey().endAt(exclude(firstKeyMeu)).limitToLast(5).once('value').then((snap) => {
      snap.forEach(childSnap => {
        meuKey.unshift(childSnap.val());
      });

      firstKeyMeu = meuKey[meuKey.length - 1];
      meuKey.forEach(id => {
        carregarMeuDnv(id);
      })

      if (meuKey.length < 5)
        firstKeyMeu = null;
    });
}