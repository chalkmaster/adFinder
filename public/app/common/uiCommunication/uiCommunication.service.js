import confirmTemplate from './confirm.dialog.html';

class UiCommunicationService {
  constructor(snackbar, $uibModal) {
    this._snackbar = snackbar;
    this.$uibModal = $uibModal;
  }
  confirmIt(message, params = {}) {
    let settings = {
      template: confirmTemplate,
      size: 'sm',
      controller: ['$scope', '$uibModalInstance', ($scope, $uibModalInstance) => {
        $scope.title = (params.title || '');
        $scope.text = message;
        $scope.dismissText = (params.dismissText || 'Não');
        $scope.confirmText = (params.confirmText || 'Sim');
        $scope.ok = $uibModalInstance.close;
        $scope.cancel = $uibModalInstance.dismiss;
      }]
    };
    return this.$uibModal.open(settings).result;
  }
  snackbar(message) {
    this._snackbar.create(message);
  }
}

UiCommunicationService.$inject = ['psSnackbar', '$uibModal'];

export default UiCommunicationService;
