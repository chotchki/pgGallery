package chotchki.db.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import chotchki.db.dao.SiteSettingsMapper;
import chotchki.db.pojo.SiteSettings;

@Service
public class SiteSettingsService {
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private SiteSettingsMapper siteSettingsMapper = null;

	public SiteSettings getSettings(){
		SiteSettings settings = siteSettingsMapper.get();
		if(settings == null){
			log.info("Creating initial site settings");
			settings = new SiteSettings();
			createSettings(settings);
		}
		return settings;
	}
	
	@Transactional
	private void createSettings(SiteSettings settings){
		siteSettingsMapper.create(settings);		
	}
	
	@Transactional
	public void updateSiteSettings(SiteSettings settings){
		siteSettingsMapper.update(settings);
	}
	
	public void setSiteSettingsMapper(SiteSettingsMapper siteSettingsMapper) {
		this.siteSettingsMapper = siteSettingsMapper;
	}
}
