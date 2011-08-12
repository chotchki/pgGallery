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
	
	public List<Album> getRootAlbums(){
		return albumMapper.getRoot();
	}
	
	public List<Album> getAlbumsByParent(BigDecimal id){
		return albumMapper.getByParent(id);
	}
	
	public Album getAlbumById(BigDecimal id){
		return albumMapper.getById(id);
	}
	
	public Album createAlbum(Album album){
		return albumMapper.create(album);
	}
	
	public void updateAlbum(Album album){
		albumMapper.update(album);
	}

	public void setAlbumMapper(AlbumMapper albumMapper) {
		this.albumMapper = albumMapper;
	}
}