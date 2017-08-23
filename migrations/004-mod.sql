-- up
CREATE TABLE aprove (
  adId TEXT
);
ALTER TABLE rating ADD COLUMN show INTEGER;

-- down
drop table aprove;