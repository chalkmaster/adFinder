-- up
CREATE TABLE aprove (
  adId varchar(50)
);
ALTER TABLE rating ADD COLUMN show INT;

-- down
drop table aprove;