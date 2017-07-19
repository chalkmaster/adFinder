class AdService {

    constructor() {

        this._http = new HttpService();
    }

    getAdList() {

        return this._http
            .get('api/v1/ad/')
            .then(ads => {

                return ads.map(obj => new Ad(obj.name, obj.id, obj.description, obj.region, obj.category));
            })
            .catch(erro => {
                
                throw new Error('Não rolou o getAdList');
            });
    }
}
