class ProfileController {
  constructor($scope, aproveResource) {
    this.$scope = $scope;
    this.name = 'Profile Screen';
    this.aproveResource = aproveResource;
    this.load();
  }
  load() {
    this.aproveResource.get().$promise.then(response => {
      this.ads = response.ad;
      this.ratings = response.rating;
    }) 
  }

  desaproveAd(id) {
    this.loading = true;
    let r = prompt('Informe um motivo', 'Está em desacordo com os termos de serviço');
    this.aproveResource.desaproveAd({ id: id, reason: r }).$promise.then(response => {
      this.loading = false;
      this.load();
    }).catch(error => {
      this.loading = false;
      this.load();
    });
  }

  aproveAd(id){
      this.loading = true;
      this.aproveResource.aproveAd({ id: id }).$promise.then(response => {
        this.loading = false;
        this.load();
      }).catch(error => {
        this.loading = false;
        this.load();
      });
  }

  aproveRating(rating) {

  }

  loadAdImagesToAprove(id, dest) {
    var imgContainer = $("#"+dest);
    $.get(`/api/v1/media/ad/${id}`, function (data) {
      if (data && data.length) {
        imgContainer.html('');
        for (var name of data) {
          imgContainer.append(`<div style="margin:2rem;padding:2rem;max-width:40rem;height:auto;"><img style="width:100%;height:100%;" src="http://vendamaisgloblalpeace.com.br/cdn/${id}/${name}" /></div>`);
        }
      } else {
        $(".showImg").hide();
      }
    });
  }	

}

ProfileController.$inject = ['$scope', 'aprove.resource'];

export default ProfileController;
