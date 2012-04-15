CREATE OR REPLACE FUNCTION "isItemDuplicate"("itemId" bigint)
  RETURNS boolean AS
$BODY$
select 
CASE WHEN (
	select count(*) 
	from "itemContent" 
	where "contentHash" IN (
		select "contentHash" 
		from "itemContent" 
		where "itemId" = $1
		)
	and "itemId" != $1
	)
	> 0 
THEN true
ELSE false
END;
$BODY$
  LANGUAGE sql STABLE
  COST 100;
COMMENT ON FUNCTION "isItemUnique"(bigint) IS 'Detects duplicate items based off the item content hashes.';