pgGallery
=========

A web based photo gallery powered by Postgres and Spring.

Installation
------------

1. Setup an installation of PostgreSQL 9.1
    1. For linux "apt-get install postgresql-9.1"
    2. For windows goto postgresql.org, download and run their installer.

2. Create a database superuser, for example "pgGallery-admin"
    1. Run "createuser -d -P -s -h YOUR_DB_HOST pgGallery-admin"
    2. Set the password to something strong and random, this will be an admin db account.

3. Create the actual database.
    1. Run "createdb -h YOUR_DB_HOST -U pgGallery-admin -O pgGallery-admin pgGallery "The pgGallery database."

4. Check out the code from GitHub
    1. Create a directory to hold the web code, for example "c:\temp\pgGallery" or ~/pgGallery
    2. git clone git://github.com/chotchki/pgGallery.git into that directory

5. Edit the Jetty config in the src/main/webapp/WEB-INF/jetty-env.xml file.
#TODO Flush this out

DEVELOPMENT NOTES - will move to another file sometime
------------------------------------------------------
Rights
	ANON				- Can view public albums 
	GALLERY_READONLY 	- Can view private albums
	GALLERY_COMMENT		- Can comment on albums
	GALLERY_EDIT		- Can add/delete/modify photos/albums
	
	USER_REGISTERED - Just signed up, cannot do anything
	USER_NORMAL - Entry level
	USER_ADMIN - Can edit other users