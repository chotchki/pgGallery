package pgGallery.db.service;

import java.io.IOException;
import java.math.BigDecimal;

import org.apache.ibatis.annotations.Param;
import org.im4java.core.IM4JavaException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pgGallery.db.dao.ItemContentMapper;
import pgGallery.db.dao.SiteSettingsMapper;
import pgGallery.db.dao.ThumbnailMapper;
import pgGallery.db.pojo.ItemContent;
import pgGallery.db.pojo.SiteSettings;
import pgGallery.db.pojo.Thumbnail;


@Service
public class ThumbnailService {
	protected static final Logger log = LoggerFactory.getLogger(ThumbnailService.class);
	
	@Autowired
	private ImageService imageService = null;
	
	@Autowired
	private SiteSettingsMapper siteSettingsMapper = null;
	
	@Autowired
	private ItemContentMapper itemContentMapper = null;

	@Autowired
	private ThumbnailMapper thumbnailMapper = null;
	
	public Thumbnail getMainByItemId(@Param("itemId") BigDecimal itemId) throws IOException, InterruptedException, IM4JavaException{
		Thumbnail t = thumbnailMapper.getMainByItemId(itemId);
		if(t != null) {
			return t;
		}
		
		ItemContent ic = itemContentMapper.getActiveByItemId(itemId);
		if(ic == null) {
			log.error("Item {} does not exist");
			return null;
		}
		
		SiteSettings settings = siteSettingsMapper.get();
		Thumbnail thumb = new Thumbnail();
		thumb.setContentId(ic.getId());
		thumb.setHeight(settings.getMainHeight());
		thumb.setWidth(settings.getMainWidth());
		thumb.setType("main");
		thumb.setContent(imageService.scale(ic.getContent(), settings.getMainHeight(), settings.getMainWidth()));
		create(thumb);
		return thumb;
	}

	public Thumbnail getThumbByItemId(@Param("itemId") BigDecimal itemId) throws IOException, InterruptedException, IM4JavaException{
		Thumbnail t = thumbnailMapper.getThumbByItemId(itemId);
		if(t != null) {
			return t;
		}
		
		ItemContent ic = itemContentMapper.getActiveByItemId(itemId);
		if(ic == null) {
			log.error("Item {} does not exist");
			return null;
		}
		
		SiteSettings settings = siteSettingsMapper.get();
		Thumbnail thumb = new Thumbnail();
		thumb.setContentId(ic.getId());
		thumb.setHeight(settings.getThumbHeight());
		thumb.setWidth(settings.getThumbWidth());
		thumb.setType("thumb");
		thumb.setContent(imageService.scale(ic.getContent(), settings.getThumbHeight(), settings.getThumbWidth()));
		create(thumb);
		return thumb;
	}
	
	@Transactional
	public void create(Thumbnail thumb) {
		thumbnailMapper.create(thumb);
	}

	public void setImageService(ImageService imageService) {
		this.imageService = imageService;
	}

	public void setSiteSettingsMapper(SiteSettingsMapper siteSettingsMapper) {
		this.siteSettingsMapper = siteSettingsMapper;
	}

	public void setThumbnailMapper(ThumbnailMapper thumbnailMapper) {
		this.thumbnailMapper = thumbnailMapper;
	}
}