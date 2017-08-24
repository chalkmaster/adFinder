const userRepository = require("../infrastructure/repository/UserRepository");
const uuid = require('uuid/v4');

module.exports = class UserService {
  /**
   * 
   * @param {userRepository} userRepository 
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  auth(email, pass){
    return new Promise((resolve, reject) => {
      this.findByEmail(email).then((data) => {
        if (data && data.password){
          if (data.password == pass){
            var session = uuid();
            if (data.email.indexOf("@globalpeace.com.br") > -1)
              session = `1${session}`;
            else
              session = `0${session}`;            
            resolve(session);
          }
          else
            reject("invalid");
        }
      }).catch((err) => {reject(err)});
    });
  }

  findByEmail(email) {
    return new Promise((resolve, reject) => {
      this.userRepository.findByEmail(email).then((data) => {
        resolve(data);
      }).catch((err) => { reject(err) });
    });
  }

  insert(user) {
    return new Promise((resolve, reject) => {
      this.userRepository.findByCpf(user.cpf).then((data) => {
        if (data && data.length > 0) {
          const message = `Já existe um usuário cadastrado com esse CPF`;
          reject(message);
          throw message;
        } else {
          this.userRepository.insert(user).then((data) => {
            resolve(data);
          }).catch((err) => { reject(err) });
        }
      }).catch((err) => { reject(err); });
    });
  }
}