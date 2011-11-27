package chotchki.db.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.im4java.core.IM4JavaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import chotchki.db.dao.ItemContentMapper;
import chotchki.db.pojo.Item;
import chotchki.db.pojo.ItemContent;

@Service
public class ItemContentService {
	private final MessageDigest md;

	public ItemContentService() throws NoSuchAlgorithmException {
		md = MessageDigest.getInstance("SHA-256");
	}
	
	@Autowired
	private ImageService imageService = null;
	
	@Autowired
	private ItemContentMapper itemContentMapper = null;
	
	@Autowired
	private ThumbnailService thumbnailService = null;
	
	@Transactional
	public void create(ItemContent content) {
		content.setContentHash(md.digest(content.getContent())); //ensure the hash is updated
		itemContentMapper.create(content);
	}
	
	@Transactional
	public void rotateLeftByItemId(BigDecimal itemId) throws IOException, InterruptedException, IM4JavaException {
		ItemContent c = itemContentMapper.getActiveByItemId(itemId);
		c.setContent(imageService.rotateLeft(c.getContent()));
		create(c);
		thumbnailService.upload(c);
	}
	
	@Transactional
	public void rotateRightByItemId(BigDecimal itemId) throws IOException, InterruptedException, IM4JavaException {
		ItemContent c = itemContentMapper.getActiveByItemId(itemId);
		c.setContent(imageService.rotateRight(c.getContent()));
		create(c);
		thumbnailService.upload(c);
	}
	
	public void upload(Item item, byte[] content) throws IOException, InterruptedException, IM4JavaException {
		ItemContent icontent = new ItemContent();
		icontent.setItemId(item.getId());
		icontent.setContent(content);
		create(icontent);
		
		thumbnailService.upload(icontent);
	}
}
