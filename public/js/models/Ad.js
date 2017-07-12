class Ad {

    constructor(name, id, description, region, category, contacts, medias) {

        this._name = name;
        this._id = id;
        this._description = description;
        this._region = region;
        this._category = category;
        this._contacts = contacts;
        this._medias = medias;
        Object.freeze(this);
    }

    get name() {

        return this._name;
    }

    get id() {

        return this._id;
    }

    get description() {

        return this._description;
    }

    get shortDescription() {

        return this._description; //TODO: Implement a short description with a limited number of characters
    }

    get region() {

        return this._region;
    }

    get category() {

        return this._category;
    }

    get contacts() {

        return this._contacts;
    }

    get medias() {

        return this._medias;
    }
}
