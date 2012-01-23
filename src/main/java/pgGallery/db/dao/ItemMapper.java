package pgGallery.db.dao;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import pgGallery.db.pojo.Item;


public interface ItemMapper {
	static final String SELECT = "select *, \"isItemDuplicate\"(id) AS duplicate from items where ";
	
	@Select(SELECT + "\"albumId\" is null")
	public List<Item> getNonAlbum();
	
	@Select(SELECT + "\"albumId\" = #{albumId}")
	public List<Item> getByAlbum(@Param("albumId") BigDecimal albumId);
	
	@Select(SELECT + "id = #{id}")
	public Item getById(@Param("id") BigDecimal id);
	
	@Options(useGeneratedKeys=true)
	@Insert("insert into items(\"albumId\", name, \"mimeType\") values (#{albumId}, #{name}, #{mimeType})")
	public void create(Item item);
	
	@Delete("delete from \"items\" where id = #{id}")
	public void delete(Item item);
	
	@Update("update items set \"albumId\" = #{albumId}, name = #{name}, \"mimeType\" = #{mimeType} where id = #{id}")
	public void update(Item item);
}