package pgGallery.db.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pgGallery.db.dao.AlbumMapper;
import pgGallery.db.pojo.Album;


@Service
public class AlbumService {
	@Autowired
	private AlbumMapper albumMapper = null;
	
	@PostFilter("hasAnyRole('ROLE_USER','ROLE_ADMIN') or filterObject.isPublic() == true")
	public List<Album> getRoot(){
		return albumMapper.getRoot();
	}
	
	@PostFilter("hasAnyRole('ROLE_USER','ROLE_ADMIN') or filterObject.isPublic() == true")
	public List<Album> getByParent(BigDecimal id){
		return albumMapper.getByParent(id);
	}
	
	@PostAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN') or returnObject.isPublic() == true")
	public Album getById(BigDecimal id){
		return albumMapper.getById(id);
	}
	
	public List<Album> getBreadcrumbById(BigDecimal id){
		if(id == null) {
			return new ArrayList<Album>();
		}
		List<Album> crumbs = albumMapper.getBreadcrumbById(id);
		Collections.reverse(crumbs);
		return crumbs;
	}
	
	@Transactional
	public void create(Album album){
		albumMapper.create(album);
	}
	
	@Transactional
	public void update(Album album){
		albumMapper.update(album);
	}
	
	@Transactional
	public void delete(Album album) {
		albumMapper.delete(album);
	}

	public void setAlbumMapper(AlbumMapper albumMapper) {
		this.albumMapper = albumMapper;
	}
}