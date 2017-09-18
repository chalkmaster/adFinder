class AdsList {

    constructor() {

        this._ads = [];
    }

    add(ad) {

        this._ads.push(ad);
    }

    get ads() {

        return [].concat(this._ads);
    }

}
