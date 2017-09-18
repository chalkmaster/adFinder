const cpf = require('cpf_cnpj').CPF;
const cnpj = require('cpf_cnpj').CNPJ;

module.exports = class adValidator{  
  validate(adToValidate){
    let errors = [];
    if (!adToValidate.name || adToValidate.name.trim() == '')
      errors.push({errorCode: 100, errorMessage: 'Informe um nome'});

    if (!adToValidate.id || adToValidate.id.trim() == '' || (!cpf.isValid(adToValidate.id) && !cnpj.isValid(adToValidate.id)))
      errors.push({errorCode: 101, errorMessage: 'Informe um cpf ou cnpj válido'});

    if (!adToValidate.description || adToValidate.description.trim() == '')
      errors.push({errorCode: 102, errorMessage: 'Informe uma descrição'});
    
    if (!adToValidate.region || adToValidate.region.trim() == '')
      errors.push({errorCode: 103, errorMessage: 'Informe uma região'});
    
    if (!adToValidate.category || adToValidate.category.trim() == '')
      errors.push({errorCode: 104, errorMessage: 'Informe uma categoria'});

    if (!adToValidate.contacts || (!adToValidate.contacts.phone && !adToValidate.contacts.email) || (adToValidate.contacts.email == '' && adToValidate.contacts.phone == ''))
      errors.push({errorCode: 105, errorMessage: 'Informe ao menos uma forma de contato'});
      
    return {valid: errors.length == 0, errorList: errors};
  }
}