package pgGallery.db.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pgGallery.db.dao.SiteSettingsMapper;
import pgGallery.db.pojo.SiteSettings;


@Service
public class SiteSettingsService {
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private SiteSettingsMapper siteSettingsMapper = null;

	public SiteSettings get(){
		SiteSettings settings = siteSettingsMapper.get();
		if(settings == null){
			log.info("Creating initial site settings");
			settings = new SiteSettings();
			create(settings);
		}
		return settings;
	}
	
	@Transactional
	private void create(SiteSettings settings){
		siteSettingsMapper.create(settings);		
	}
	
	@Transactional
	public void update(SiteSettings settings){
		siteSettingsMapper.update(settings);
	}
	
	public void setSiteSettingsMapper(SiteSettingsMapper siteSettingsMapper) {
		this.siteSettingsMapper = siteSettingsMapper;
	}
}
