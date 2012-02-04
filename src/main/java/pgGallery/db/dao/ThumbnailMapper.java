package pgGallery.db.dao;

import java.math.BigDecimal;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import pgGallery.db.pojo.Thumbnail;


public interface ThumbnailMapper {
	@Select("select t.* " +
			"from thumbnails t, \"itemContent\" i " +
			"where t.type = 'main' " +
			"and t.\"contentId\" = i.id " +
			"and i.active = true " +
			"and i.\"itemId\" = #{itemId}")
	public Thumbnail getMainByItemId(@Param("itemId") BigDecimal itemId);
	
	@Select("select t.* " +
			"from thumbnails t, \"itemContent\" i " +
			"where t.type = 'thumb' " +
			"and t.\"contentId\" = i.id " +
			"and i.active = true " +
			"and i.\"itemId\" = #{itemId}")
	public Thumbnail getThumbByItemId(@Param("itemId") BigDecimal itemId);
	
	@Insert("insert into thumbnails(\"contentId\", height, width, content, type) values (#{contentId}, #{height}, #{width}, #{content}, #{type})")
	@Options(useGeneratedKeys=true, keyColumn="id")
	public void create(Thumbnail thumbnail);
}