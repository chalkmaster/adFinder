class HomeMainController {
  constructor($rootScope, adsResource, ratingResource, $stateParams) {
    this.name = 'Home Main Screen';
    this.adsResource = adsResource;
    this.ratingResource = ratingResource;
    $rootScope.$on('search', this.filter.bind(this));
    $rootScope.$on('loadList', this.load.bind(this));
    if(!$stateParams.preventLoad) {
      this.load();
    }
  }
  load(){
    this.loading = true;
    this.searchHint = "";
    this.adsResource.query().$promise.then((data) => {
      this.ads = data;
      this.ads.map(x => {
        this.ratingResource.query({id: x.id }).$promise.then(data => {
          x.liked = data.filter((x) => x.liked == 1).length;
          x.disliked = data.filter((x) => x.liked == 0).length;
          x.comments = data.filter((x) => x.description !== "").length;
        });
      });
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }
  filter(event, query){
    this.searchHint = query;
    this.loading = true;
    this.adsResource.filter({query}).$promise.then(data => {
      this.ads = data;
      this.ads.map(x => {
        this.ratingResource.query({id: x.id }).$promise.then(data => {
          x.liked = data.filter((x) => x.liked == 1).length;
          x.disliked = data.filter((x) => x.liked == 0).length;
          x.comments = data.filter((x) => x.description !== "").length;
        });
      });
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }
}

HomeMainController.$inject = ['$rootScope', 'ads.resource', 'ratings.resource', '$stateParams'];

export default HomeMainController;
