package chotchki.db.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.im4java.core.IM4JavaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import chotchki.db.dao.ItemContentMapper;
import chotchki.db.dao.ItemMapper;
import chotchki.db.pojo.Item;
import chotchki.db.pojo.ItemContent;

@Service
public class ItemService {
	@Autowired
	private ItemMapper itemMapper = null;
	
	@Autowired
	private ItemContentMapper itemContentMapper = null;
	
	@Autowired
	private ThumbnailService thumbnailService = null;
	
	public List<Item> getNonAlbum(){
		return itemMapper.getNonAlbum();
	}
	
	public List<Item> getByAlbum(BigDecimal albumId){
		return itemMapper.getByAlbum(albumId);
	}

	public Item getById(BigDecimal id){
		return itemMapper.getById(id);
	}

	@Transactional
	public void create(Item item){
		itemMapper.create(item);
	}
	
	@Transactional
	public void uploadAll(List<MultipartFile> files, BigDecimal albumId) throws IOException, NoSuchAlgorithmException, InterruptedException, IM4JavaException{
		for(MultipartFile f : files){
			upload(f, albumId);
		}
	}
	
	@Transactional
	public void upload(MultipartFile file, BigDecimal albumId) throws IOException, NoSuchAlgorithmException, InterruptedException, IM4JavaException{
		Item item = new Item();
		item.setAlbumId(albumId);
		item.setName(file.getOriginalFilename());
		item.setMimeType(file.getContentType());
		create(item);
		
		ItemContent content = new ItemContent();
		content.setItemId(item.getId());
		content.setActive(true);
		content.setContent(file.getBytes());
		content.setContentHash(MessageDigest.getInstance("SHA-256").digest(file.getBytes()));
		itemContentMapper.create(content);
		thumbnailService.create(content);
	}
	
	public void update(Item item){
		itemMapper.update(item);
	}

	public void setItemMapper(ItemMapper itemMapper) {
		this.itemMapper = itemMapper;
	}

	public void setItemContentMapper(ItemContentMapper itemContentMapper) {
		this.itemContentMapper = itemContentMapper;
	}

	public void setThumbnailService(ThumbnailService thumbnailService) {
		this.thumbnailService = thumbnailService;
	}
}
