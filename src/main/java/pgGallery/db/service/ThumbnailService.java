package pgGallery.db.service;

import java.io.IOException;
import java.math.BigDecimal;

import org.apache.ibatis.annotations.Param;
import org.im4java.core.IM4JavaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pgGallery.db.dao.SiteSettingsMapper;
import pgGallery.db.dao.ThumbnailMapper;
import pgGallery.db.pojo.ItemContent;
import pgGallery.db.pojo.SiteSettings;
import pgGallery.db.pojo.Thumbnail;


@Service
public class ThumbnailService {
	@Autowired
	private ImageService imageService = null;
	
	@Autowired
	private SiteSettingsMapper siteSettingsMapper = null;

	@Autowired
	private ThumbnailMapper thumbnailMapper = null;
	
	public Thumbnail getMainByItemId(@Param("itemId") BigDecimal itemId){
		return thumbnailMapper.getMainByItemId(itemId);
	}

	public Thumbnail getThumbByItemId(@Param("itemId") BigDecimal itemId){
		return thumbnailMapper.getThumbByItemId(itemId);
	}
	
	@Transactional
	public void create(Thumbnail thumb) {
		thumbnailMapper.create(thumb);
	}

	@Transactional
	public void upload(ItemContent content) throws IOException, InterruptedException, IM4JavaException {
		SiteSettings settings = siteSettingsMapper.get();

		Thumbnail thumb = new Thumbnail();
		thumb.setContentId(content.getId());
		thumb.setHeight(settings.getThumbHeight());
		thumb.setWidth(settings.getThumbWidth());
		thumb.setType("thumb");
		thumb.setContent(imageService.scale(content.getContent(), settings.getThumbHeight(), settings.getThumbWidth()));
		create(thumb);

		Thumbnail main = new Thumbnail();
		main.setContentId(content.getId());
		main.setHeight(settings.getMainHeight());
		main.setWidth(settings.getMainWidth());
		main.setType("main");
		main.setContent(imageService.scale(content.getContent(), settings.getMainHeight(), settings.getMainWidth()));
		create(main);
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