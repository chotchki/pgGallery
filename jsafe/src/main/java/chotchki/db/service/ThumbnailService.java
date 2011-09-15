package chotchki.db.service;

import java.io.IOException;

import org.im4java.core.IM4JavaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import chotchki.db.dao.SiteSettingsMapper;
import chotchki.db.dao.ThumbnailMapper;
import chotchki.db.pojo.ItemContent;
import chotchki.db.pojo.SiteSettings;
import chotchki.db.pojo.Thumbnail;

@Service
public class ThumbnailService {
	@Autowired
	private ImageService imageService = null;
	
	@Autowired
	private SiteSettingsMapper siteSettingsMapper = null;

	@Autowired
	private ThumbnailMapper thumbnailMapper = null;

	@Transactional
	public void create(ItemContent content) throws IOException, InterruptedException, IM4JavaException {
		SiteSettings settings = siteSettingsMapper.get();

		Thumbnail small = new Thumbnail();
		small.setContentId(content.getId());
		small.setHeight(settings.getThumbHeight());
		small.setWidth(settings.getThumbWidth());
		small.setContent(imageService.scale(content.getContent(), settings.getThumbHeight(),
				settings.getThumbWidth()));
		thumbnailMapper.create(small);

		Thumbnail main = new Thumbnail();
		main.setContentId(content.getId());
		main.setHeight(settings.getMainHeight());
		main.setWidth(settings.getMainWidth());
		main.setContent(imageService.scale(content.getContent(), settings.getMainHeight(),
				settings.getMainWidth()));
		thumbnailMapper.create(main);
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