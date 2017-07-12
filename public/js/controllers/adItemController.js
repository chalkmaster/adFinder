class adItemController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._adsList = new AdsList(model =>
            this._adsView.update(model));

        this._adsView = new AdsView($('#adsView'));
        this._adsView.update(this._adsList);

        this._message = new Message();
        this._messageView = new MessageView($('#messageView'));
        this._messageView.update(this._message);

    }
}
