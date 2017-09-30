-- up
CREATE TABLE rating (
  adId varchar(50),
  description TEXT,
  liked INTEGER
);

-- down
drop table rating;