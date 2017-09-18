class AdItemController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._adsList = new Bind (
            new AdsList(),
            new AdItemView($('#adsView')),
            'add');

        let service = new AdService();

        service.getAdList()
        .then(ads => {

          ads.forEach(ad => this._adsList.add(ad));
        })
        .catch(error => console.log(error));
    }
}
