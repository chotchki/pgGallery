package chotchki.db.dao;

import java.math.BigDecimal;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import chotchki.db.pojo.ItemContent;

public interface ItemContentMapper {
	@Select("select * from itemContent where itemId = #{itemId} and active = true")
	public ItemContent getActiveById(@Param("itemId") BigDecimal itemId);
	
	@Insert("insert into itemContent(itemId, content, active, contentHash) values (#{itemId}, #{content}, #{active}, #{contentHash}) returning *")
	public ItemContent create(ItemContent content);
	
	@Update("update itemContent set itemId = #{itemId}, content = #{content}, active = #{active}, contentHash = #{contentHash} where id = #{id}")
	public void update(ItemContent content);
}