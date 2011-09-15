package chotchki.db.dao;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import chotchki.db.pojo.Thumbnail;

public interface ThumbnailMapper {
	@Select("select * from thumbnails where \"contentId\" = #{contentId}")
	public List<Thumbnail> getByContentId(@Param("contentId") BigDecimal contentId);
	
	@Insert("insert into thumbnails(\"contentId\", height, width, content) values (#{contentId}, #{height}, #{width}, #{content})")
	public void create(Thumbnail thumbnail);
}