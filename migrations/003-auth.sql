-- up
CREATE TABLE user (
  cpf varchar(50),
  email TEXT,
  password INTEGER
);

-- down
drop table user;