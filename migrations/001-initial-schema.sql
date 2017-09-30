-- up
-- CREATE VIRTUAL TABLE ad USING FTS5 (
--  id,  name,  description,  region,  category,  phone,  email,  site
--);

-- down
-- drop table ad;

CREATE TABLE ad (
id varchar(50) NOT NULL,
name text,
description text,
region text,
category text,
phone varchar(255),
email varchar(255),
site varchar(255),
PRIMARY KEY (id),
FULLTEXT 
(
  name, 
  description,
  region,
  category,
  phone,
  email,
  site
));