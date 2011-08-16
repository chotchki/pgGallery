--
-- PostgreSQL database dump
--

-- Dumped from database version 9.1beta3
-- Dumped by pg_dump version 9.1beta3
-- Started on 2011-08-15 21:18:35 EDT

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 7 (class 2615 OID 24633)
-- Name: webschema; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA webschema;


SET search_path = webschema, pg_catalog;

--
-- TOC entry 218 (class 1255 OID 32913)
-- Dependencies: 549 7
-- Name: itemContent_oneActive(); Type: FUNCTION; Schema: webschema; Owner: -
--

CREATE FUNCTION "itemContent_oneActive"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	total int;
BEGIN
	select count(*) into total
	where active = true
	and itemId = NEW.itemId;

	if total > 1 then
		raise exception 'Only one content record can be active at a time.';
	end if;
END;
$$;


SET default_with_oids = false;

--
-- TOC entry 164 (class 1259 OID 32793)
-- Dependencies: 1947 7
-- Name: albums; Type: TABLE; Schema: webschema; Owner: -
--

CREATE TABLE albums (
    id bigint NOT NULL,
    name text NOT NULL,
    "parentId" bigint,
    "isPublic" boolean DEFAULT false NOT NULL
);


--
-- TOC entry 163 (class 1259 OID 32791)
-- Dependencies: 164 7
-- Name: albums_id_seq; Type: SEQUENCE; Schema: webschema; Owner: -
--

CREATE SEQUENCE albums_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 1976 (class 0 OID 0)
-- Dependencies: 163
-- Name: albums_id_seq; Type: SEQUENCE OWNED BY; Schema: webschema; Owner: -
--

ALTER SEQUENCE albums_id_seq OWNED BY albums.id;


--
-- TOC entry 171 (class 1259 OID 32894)
-- Dependencies: 1953 7
-- Name: itemContent; Type: TABLE; Schema: webschema; Owner: -
--

CREATE TABLE "itemContent" (
    id bigint NOT NULL,
    "itemId" bigint NOT NULL,
    content bytea NOT NULL,
    active boolean DEFAULT false NOT NULL,
    "contentHash" bytea NOT NULL
);


--
-- TOC entry 170 (class 1259 OID 32892)
-- Dependencies: 171 7
-- Name: itemContent_id_seq; Type: SEQUENCE; Schema: webschema; Owner: -
--

CREATE SEQUENCE "itemContent_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 1977 (class 0 OID 0)
-- Dependencies: 170
-- Name: itemContent_id_seq; Type: SEQUENCE OWNED BY; Schema: webschema; Owner: -
--

ALTER SEQUENCE "itemContent_id_seq" OWNED BY "itemContent".id;


--
-- TOC entry 166 (class 1259 OID 32809)
-- Dependencies: 7
-- Name: items; Type: TABLE; Schema: webschema; Owner: -
--

CREATE TABLE items (
    id bigint NOT NULL,
    "albumId" bigint,
    name text NOT NULL,
    "mimeType" text NOT NULL
);


--
-- TOC entry 165 (class 1259 OID 32807)
-- Dependencies: 166 7
-- Name: item_id_seq; Type: SEQUENCE; Schema: webschema; Owner: -
--

CREATE SEQUENCE item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 1978 (class 0 OID 0)
-- Dependencies: 165
-- Name: item_id_seq; Type: SEQUENCE OWNED BY; Schema: webschema; Owner: -
--

ALTER SEQUENCE item_id_seq OWNED BY items.id;


--
-- TOC entry 169 (class 1259 OID 32885)
-- Dependencies: 1950 1951 7
-- Name: siteSettings; Type: TABLE; Schema: webschema; Owner: -
--

CREATE TABLE "siteSettings" (
    id integer DEFAULT 1 NOT NULL,
    "itemsPerPage" integer NOT NULL,
    "thumbHeight" integer NOT NULL,
    "thumbWidth" integer NOT NULL,
    "mainHeight" integer NOT NULL,
    "mainWidth" integer NOT NULL,
    CONSTRAINT "siteSettings_check" CHECK ((id = 1))
);


--
-- TOC entry 168 (class 1259 OID 32859)
-- Dependencies: 7
-- Name: thumbnails; Type: TABLE; Schema: webschema; Owner: -
--

CREATE TABLE thumbnails (
    id bigint NOT NULL,
    "contentId" bigint NOT NULL,
    height integer NOT NULL,
    width integer NOT NULL,
    content bytea NOT NULL
);


--
-- TOC entry 167 (class 1259 OID 32857)
-- Dependencies: 168 7
-- Name: thumbnails_id_seq; Type: SEQUENCE; Schema: webschema; Owner: -
--

CREATE SEQUENCE thumbnails_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 1979 (class 0 OID 0)
-- Dependencies: 167
-- Name: thumbnails_id_seq; Type: SEQUENCE OWNED BY; Schema: webschema; Owner: -
--

ALTER SEQUENCE thumbnails_id_seq OWNED BY thumbnails.id;


--
-- TOC entry 162 (class 1259 OID 24634)
-- Dependencies: 7
-- Name: users; Type: TABLE; Schema: webschema; Owner: -
--

CREATE TABLE users (
    username character varying(255) NOT NULL,
    password text NOT NULL
);


--
-- TOC entry 1946 (class 2604 OID 32796)
-- Dependencies: 163 164 164
-- Name: id; Type: DEFAULT; Schema: webschema; Owner: -
--

ALTER TABLE albums ALTER COLUMN id SET DEFAULT nextval('albums_id_seq'::regclass);


--
-- TOC entry 1952 (class 2604 OID 32897)
-- Dependencies: 171 170 171
-- Name: id; Type: DEFAULT; Schema: webschema; Owner: -
--

ALTER TABLE "itemContent" ALTER COLUMN id SET DEFAULT nextval('"itemContent_id_seq"'::regclass);


--
-- TOC entry 1948 (class 2604 OID 32812)
-- Dependencies: 165 166 166
-- Name: id; Type: DEFAULT; Schema: webschema; Owner: -
--

ALTER TABLE items ALTER COLUMN id SET DEFAULT nextval('item_id_seq'::regclass);


--
-- TOC entry 1949 (class 2604 OID 32862)
-- Dependencies: 167 168 168
-- Name: id; Type: DEFAULT; Schema: webschema; Owner: -
--

ALTER TABLE thumbnails ALTER COLUMN id SET DEFAULT nextval('thumbnails_id_seq'::regclass);


--
-- TOC entry 1957 (class 2606 OID 32801)
-- Dependencies: 164 164
-- Name: albums_pk; Type: CONSTRAINT; Schema: webschema; Owner: -
--

ALTER TABLE ONLY albums
    ADD CONSTRAINT albums_pk PRIMARY KEY (id);


--
-- TOC entry 1959 (class 2606 OID 32922)
-- Dependencies: 164 164 164
-- Name: albums_unique_name; Type: CONSTRAINT; Schema: webschema; Owner: -
--

ALTER TABLE ONLY albums
    ADD CONSTRAINT albums_unique_name UNIQUE (name, "parentId");


--
-- TOC entry 1968 (class 2606 OID 32911)
-- Dependencies: 171 171
-- Name: itemContent_pk; Type: CONSTRAINT; Schema: webschema; Owner: -
--

ALTER TABLE ONLY "itemContent"
    ADD CONSTRAINT "itemContent_pk" PRIMARY KEY (id);


--
-- TOC entry 1961 (class 2606 OID 32817)
-- Dependencies: 166 166
-- Name: items_pk; Type: CONSTRAINT; Schema: webschema; Owner: -
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_pk PRIMARY KEY (id);


--
-- TOC entry 1966 (class 2606 OID 32891)
-- Dependencies: 169 169
-- Name: siteSettings_pk; Type: CONSTRAINT; Schema: webschema; Owner: -
--

ALTER TABLE ONLY "siteSettings"
    ADD CONSTRAINT "siteSettings_pk" PRIMARY KEY (id);


--
-- TOC entry 1964 (class 2606 OID 32867)
-- Dependencies: 168 168
-- Name: thumbnails_pk; Type: CONSTRAINT; Schema: webschema; Owner: -
--

ALTER TABLE ONLY thumbnails
    ADD CONSTRAINT thumbnails_pk PRIMARY KEY (id);


--
-- TOC entry 1955 (class 2606 OID 24641)
-- Dependencies: 162 162
-- Name: users_pk; Type: CONSTRAINT; Schema: webschema; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pk PRIMARY KEY (username);


--
-- TOC entry 1962 (class 1259 OID 32920)
-- Dependencies: 168
-- Name: fki_thumbnails_fk; Type: INDEX; Schema: webschema; Owner: -
--

CREATE INDEX fki_thumbnails_fk ON thumbnails USING btree ("contentId");


--
-- TOC entry 1973 (class 2620 OID 32914)
-- Dependencies: 171 171 218
-- Name: itemContent_trig; Type: TRIGGER; Schema: webschema; Owner: -
--

CREATE TRIGGER "itemContent_trig" AFTER INSERT OR UPDATE OF active ON "itemContent" FOR EACH ROW EXECUTE PROCEDURE "itemContent_oneActive"();


--
-- TOC entry 1969 (class 2606 OID 32802)
-- Dependencies: 1956 164 164
-- Name: albums_parentId_fkey; Type: FK CONSTRAINT; Schema: webschema; Owner: -
--

ALTER TABLE ONLY albums
    ADD CONSTRAINT "albums_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES albums(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 1972 (class 2606 OID 32904)
-- Dependencies: 171 166 1960
-- Name: itemContent_fk; Type: FK CONSTRAINT; Schema: webschema; Owner: -
--

ALTER TABLE ONLY "itemContent"
    ADD CONSTRAINT "itemContent_fk" FOREIGN KEY ("itemId") REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 1970 (class 2606 OID 32818)
-- Dependencies: 166 164 1956
-- Name: items_fk; Type: FK CONSTRAINT; Schema: webschema; Owner: -
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_fk FOREIGN KEY (id) REFERENCES albums(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 1971 (class 2606 OID 32915)
-- Dependencies: 171 168 1967
-- Name: thumbnails_fk; Type: FK CONSTRAINT; Schema: webschema; Owner: -
--

ALTER TABLE ONLY thumbnails
    ADD CONSTRAINT thumbnails_fk FOREIGN KEY ("contentId") REFERENCES "itemContent"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2011-08-15 21:18:35 EDT

--
-- PostgreSQL database dump complete
--

