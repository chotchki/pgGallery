package chotchki.db.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import chotchki.db.pojo.SiteSettings;

public interface SiteSettingsMapper {

	@Select("select * from siteSettings where id = 1")
	public SiteSettings get();
	
	@Insert("insert into siteSettings(id, itemsPerPage, thumbHeight, thumbWidth, mainHeight, mainWidth) values(#{id}, #{itemsPerPage}, #{thumbHeight}, #{thumbWidth}, #{mainHeight}, #{mainWidth})")
	public SiteSettings create(SiteSettings settings);
	
	@Update("update siteSettings set id = #{id}, itemsPerPage = #{itemsPerPage}, thumbHeight = #{thumbHeight}, thumbWidth = #{thumbWidth}, mainHeight = #{mainHeight}, mainWidth = #{mainWidth} where id = #{id}")
	public void update(SiteSettings settings);
}
