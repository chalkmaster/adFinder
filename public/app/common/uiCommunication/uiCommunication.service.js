class UiCommunicationService {
  constructor(snackbar) {
    this._snackbar = snackbar;
  }
  snackbar(message) {
    this._snackbar.create(message);
  }
}

UiCommunicationService.$inject = ['psSnackbar'];

export default UiCommunicationService;
