function criarToast(titulo, msg, classe){
     $('#toast-place').append(
          `<div 
            class="toast bg-${classe}" 
            role="alert" 
            aria-live="assertive" 
            aria-atomic="true" 
            data-delay="5000">

            <div class="toast-header">
              <strong class="mr-auto">${titulo}</strong>
              <button 
                type="button" 
                class="ml-2 mb-1 close" 
                data-dismiss="toast" 
                aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="toast-body text-light">
              ${msg}
            </div>
          </div> `
        );

        $('.toast').toast('show');

        $('.toast').on('hidden.bs.toast', e => {
             $(e.currentTarget).remove();
        })
}