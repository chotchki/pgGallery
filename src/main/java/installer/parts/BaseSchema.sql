CREATE TABLE "siteSettings" (
    id integer PRIMARY KEY DEFAULT 1 NOT NULL,
    "itemsPerPage" integer NOT NULL,
    "thumbHeight" integer NOT NULL,
    "thumbWidth" integer NOT NULL,
    "mainHeight" integer NOT NULL,
    "mainWidth" integer NOT NULL,
    CONSTRAINT "siteSettings_check" CHECK ((id = 1))
);

CREATE TABLE users (
    username character varying(255) PRIMARY KEY NOT NULL,
    password text NOT NULL
);

CREATE TABLE albums (
    id bigserial PRIMARY KEY NOT NULL,
    name text NOT NULL,
    "parentId" bigint,
    "isPublic" boolean DEFAULT false NOT NULL,
    "defaultId" bigint,
    CONSTRAINT albums_unique_name UNIQUE (name, "parentId"),
    CONSTRAINT "albums_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES albums(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX fki_albums_default_item ON albums USING btree ("defaultId");

	
CREATE TABLE items (
    id bigserial PRIMARY KEY NOT NULL,
    "albumId" bigint,
    name text NOT NULL,
    "mimeType" text NOT NULL,
    CONSTRAINT items_fk FOREIGN KEY ("albumId") REFERENCES albums(id) ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE albums ADD CONSTRAINT albums_default_item FOREIGN KEY ("defaultId") REFERENCES items(id) ON UPDATE CASCADE ON DELETE SET NULL;

CREATE INDEX fki_items_fk ON items USING btree ("albumId");

CREATE TABLE "itemContent" (
    id bigserial PRIMARY KEY NOT NULL,
    "itemId" bigint NOT NULL,
    content bytea NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "contentHash" bytea NOT NULL,
    CONSTRAINT "itemContent_fk" FOREIGN KEY ("itemId") REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE
);
    
CREATE FUNCTION "itemContent_active"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	lock table "itemContent" in exclusive mode;

	delete from "itemContent"
	where "contentHash" = NEW."contentHash"
	and "itemId" = NEW."itemId";
	
	update "itemContent"
	set active = false
	where "itemId" = NEW."itemId";

	NEW.active := true;

	delete from "thumbnails"
	where "contentId" IN (
		select id
		from "itemContent"
		where "itemId" = NEW."itemId"
		and active = false
		);

	return NEW;
END;
$$;

CREATE TRIGGER "itemContent_trg" BEFORE INSERT ON "itemContent" FOR EACH ROW EXECUTE PROCEDURE "itemContent_active"();

CREATE FUNCTION "itemContent_oneActive"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	total int;
BEGIN
	lock table "itemContent" in exclusive mode;
	
	select count(*) into total
	from "itemContent"
	where active = true
	and "itemId" = NEW."itemId";

	if total > 1 then
		raise exception 'Only one content record can be active at a time.';
	end if;

	return NEW;
END;
$$;

CREATE TRIGGER "itemContent_trg_active" BEFORE UPDATE OF active ON "itemContent" FOR EACH ROW EXECUTE PROCEDURE "itemContent_oneActive"();

CREATE TABLE thumbnails (
    id bigserial PRIMARY KEY NOT NULL,
    "contentId" bigint NOT NULL,
    height integer NOT NULL,
    width integer NOT NULL,
    content bytea NOT NULL,
    type character varying NOT NULL,
    CONSTRAINT thumbnail_type CHECK ((((type)::text = 'main'::text) OR ((type)::text = 'thumb'::text))),
    CONSTRAINT thumbnail_limit UNIQUE ("contentId", type),
    CONSTRAINT thumbnails_fk FOREIGN KEY ("contentId") REFERENCES "itemContent"(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX fki_thumbnails_fk ON thumbnails USING btree ("contentId");