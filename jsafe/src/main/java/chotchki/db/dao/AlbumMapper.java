package chotchki.db.dao;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import chotchki.db.pojo.Album;

public interface AlbumMapper {
	@Select("select * from albums where parentId is null")
	public List<Album> getRootAlbums();
	
	@Select("select * from albums where parentId = #{id}")
	public List<Album> getAlbumsByParent(@Param("id") BigDecimal id);
	
	@Select("select * from albums where id = #{id}")
	public Album getAlbumById(@Param("id") BigDecimal id);
	
	@Insert("insert into albums(name, parentId, owner) values (#{name}, #{parentId}, #{owner}) returning *")
	public Album createAlbum(Album album);
	
	@Update("update albums set name = #{name}, parentId = #{parentId}, owner = #{owner} where id = #{id}")
	public void updateAlbum(Album album);
}