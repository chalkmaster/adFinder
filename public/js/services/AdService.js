class AdService {

    getAds(cb) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/v1/ad/');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {

                  cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Ad(objeto.name, objeto.id, objeto.description,
                            objeto.region, objeto.category, objeto.contacts, objeto.medias)));

                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as paradas', null);
                }
            }
        }

        xhr.send();
    }
}
