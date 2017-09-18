/**
 * Wrapper that:
 * 1) Hook for state enter => open modal
 * 2) Hook for state exit => close modal
 * 3) Puts the state template into the modal
 */
let modalize = (params) => {
  let template = params.template;
  let resolveParameters = Object.keys(params.resolve || {});
  let modal;

  let onEnter = ($state, $uibModal, ...resolved) => {
    let resolvedStuff = {};
    resolveParameters.forEach((resolveParameter) => {
      resolvedStuff[resolveParameter] = resolved.shift();
    });
    modal = $uibModal.open({
      template,
      controller: ['$scope', ($scope) => {
        $scope.$resolve = resolvedStuff;
      }],
      windowClass: 'modal-window',
      size: 'lg'
    });
    modal.closed.then(() => {
      if (modal) {
        $state.go('^');
      }
    });
  };
  onEnter.$inject = ['$state', '$uibModal', ...resolveParameters];

  let routeParams = Object.assign(params, {
    onEnter,
    onExit: () => {
      modal.close();
      modal = false;
    }
  });
  delete routeParams.template;
  return routeParams;
};

export {
  modalize
};
