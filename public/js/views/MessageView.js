class MessageView extends View {

    constructor(elemento) {

       super(elemento);
    }

   template(model) {

       return model.text ? `<div class="alert"><span>${model.text}</span></div>` : '<span></span>';
   }
}
