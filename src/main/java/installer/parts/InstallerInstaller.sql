CREATE TABLE "pgGalleryInstaller"
(
   "partName" character varying NOT NULL, 
   installed boolean NOT NULL DEFAULT false, 
   "statusDate" timestamp with time zone NOT NULL DEFAULT now(), 
   CONSTRAINT "pgGalleryInstaller_pk" PRIMARY KEY ("partName")
);

ALTER TABLE "pgGalleryInstaller" OWNER TO "pgGallery-admin";
COMMENT ON COLUMN "pgGalleryInstaller"."partName" IS 'Name of the Installer Part';
COMMENT ON COLUMN "pgGalleryInstaller".installed IS 'Flag indicating whether this part has been installed.';
COMMENT ON TABLE "pgGalleryInstaller" IS 'Table tracking the install process status.';
