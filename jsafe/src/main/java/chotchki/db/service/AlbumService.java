package chotchki.db.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chotchki.db.dao.AlbumMapper;
import chotchki.db.pojo.Album;

@Service
public class AlbumService {
	@Autowired
	private AlbumMapper albumMapper = null;
	
	public List<Album> getRoot(){
		return albumMapper.getRoot();
	}
	
	public List<Album> getByParent(BigDecimal id){
		return albumMapper.getByParent(id);
	}
	
	public Album getById(BigDecimal id){
		return albumMapper.getById(id);
	}
	
	public Album create(Album album){
		return albumMapper.create(album);
	}
	
	public void update(Album album){
		albumMapper.update(album);
	}

	public void setAlbumMapper(AlbumMapper albumMapper) {
		this.albumMapper = albumMapper;
	}
}