class HomeMainController {
  constructor(adsResource) {
    this.name = 'Home Main Screen';
    this.adsResource = adsResource;
    this.load();
  }
  load(){
    this.loading = true;
    this.adsResource.query().$promise.then((data) => {
      this.ads = data;
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }
}

HomeMainController.$inject = ['ads.resource'];

export default HomeMainController;
