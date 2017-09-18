class UserValidator {
    constructor() {

    }
    validate(user) {
      // implement front side user data to be fetched 
        try {
            this.validateCpf(user.cpf); 

        } catch (e){

        }

        return true;
    }
    validateCpf(data) {
      if (!data) return false;
      let soma = 0;
      let resto;
      let input = data.replace(/\D/g, '');
      let i = 0;
  
      if(data == '00000000000') return false;
      for(i=1; i<=9; i++) soma = soma + parseInt(input.substring(i-1, i)) * (11 - i);
      resto = (soma * 10) % 11;
  
      if((resto == 10) || (resto == 11)) resto = 0;
      if(resto != parseInt(input.substring(9, 10))) return false;
  
      soma = 0;
      for(i = 1; i <= 10; i++) soma = soma + parseInt(input.substring(i-1, i))*(12-i);
      resto = (soma * 10) % 11;
  
      if((resto == 10) || (resto == 11)) resto = 0;
      if(resto != parseInt(input.substring(10, 11))) return false;
      return true;
    }
  }
  
  //UserValidator.$inject = [];
  
  export default UserValidator;
  