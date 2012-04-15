CREATE OR REPLACE FUNCTION "isAlbumPublic"("itemId" bigint)
  RETURNS boolean AS
$BODY$
select true = ALL(
WITH RECURSIVE t(id, "parentId") AS (
	select a.id, a."parentId"
	from albums a
	where a.id = $1
	UNION
	select a.id, a."parentId"
	from t, albums a
	where t."parentId" = a.id
	) 
select a."isPublic"
from t, albums a
where a.id = t.id)
$BODY$
  LANGUAGE sql STABLE
  COST 100;