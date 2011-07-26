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
		return albumMapper.getRootAlbums();
	}
	
	public List<Album> getAlbumsByParent(BigDecimal id){
		return albumMapper.getAlbumsByParent(id);
	}
	
	public Album getAlbumById(BigDecimal id){
		return albumMapper.getAlbumById(id);
	}
	
	public Album createAlbum(Album album){
		return albumMapper.createAlbum(album);
	}
	
	public void updateAlbum(Album album){
		albumMapper.updateAlbum(album);
	}

	public void setAlbumMapper(AlbumMapper albumMapper) {
		this.albumMapper = albumMapper;
	}
}