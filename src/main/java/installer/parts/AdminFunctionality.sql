ALTER TABLE users ADD COLUMN enabled boolean NOT NULL DEFAULT false;

ALTER TABLE users ADD COLUMN admin boolean NOT NULL DEFAULT false;