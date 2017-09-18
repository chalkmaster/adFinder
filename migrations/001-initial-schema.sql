-- up
CREATE VIRTUAL TABLE ad USING FTS5 (
  id,
  name,
  description,
  region,
  category,
  phone,
  email,
  site
);

-- down
drop table ad;