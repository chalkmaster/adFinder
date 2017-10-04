class HomeMainController {
  constructor($rootScope, $state, adsResource, ratingResource, categoryHelper, $stateParams, $interval,$timeout) {
    this.name = 'Home Main Screen';
    this.$state = $state;
    this.adsResource = adsResource;
    this.categoryHelper = categoryHelper;
    this.ratingResource = ratingResource;
    this.$interval = $interval;
    this.$timeout = $timeout;
    $rootScope.$on('search', this.filter.bind(this));
    $rootScope.$on('loadList', this.load.bind(this));
    if(!$stateParams.preventLoad) {
      this.load();
    }
    this.swapMainBanner();
    this.swapSecondaryBanner();
  }
  swapMainBanner(){
    var that = this;
    this.$interval(function() {
      that.$timeout(()=>{
        angular.element(document.querySelectorAll('#mainF')).triggerHandler('click');
      }
      );
    }, 8000);
  }
  swapSecondaryBanner(){
    var that = this;    
    this.$interval(function() {
      that.$timeout(()=>{
        angular.element(document.querySelectorAll('#secF')).triggerHandler('click');
      }
      );
    }, 10000);
  }
  load(){
    this.loading = true;
    this.searchHint = "";
    this.categoryHelper.clear();
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
  openAdDetail(ad){
    this.loadingAd = ad.id;
    this.$state.go('main.details', {id: ad.id});
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

HomeMainController.$inject = ['$rootScope', '$state', 'ads.resource', 'ratings.resource', 'categoryHelper', '$stateParams', '$interval', '$timeout'];

export default HomeMainController;
