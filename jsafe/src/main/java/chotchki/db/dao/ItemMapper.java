package chotchki.db.dao;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import chotchki.db.pojo.Item;

public interface ItemMapper {
	@Select("select * from items where albumId is null")
	public List<Item> getNonAlbumItems();
	
	@Select("select * from items where albumId = #{albumId}")
	public List<Item> getItemsByAlbum(@Param("album") BigDecimal albumId);
	
	@Select("select * from items where id = #{id}")
	public Item getItemById(@Param("id") BigDecimal id);
	
	@Insert("insert into items(albumId, name, mimeType, contentHash, owner, content) values (#{albumId}, #{name}, #{mimeType}, #{contentHash}, #{owner}, #{content}) returning *")
	public Item createItem(Item item);
	
	@Update("update items set albumId = #{albumId}, name = #{name}, mimeType = #{mimeType}, contentHash = #{contentHash}, owner = #{owner}, content = #{content} where id = #{id}")
	public void updateItem(Item item);
}