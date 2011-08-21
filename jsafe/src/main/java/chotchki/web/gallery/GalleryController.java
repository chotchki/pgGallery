package chotchki.web.gallery;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import chotchki.db.pojo.Album;
import chotchki.db.service.AlbumService;
import chotchki.db.service.ItemService;
import chotchki.db.service.SiteSettingsService;

@Controller
public class GalleryController {
	protected Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private AlbumService albumService = null;

	@Autowired
	private ItemService itemService = null;
	
	@Autowired SiteSettingsService siteSettingsService = null;

	@RequestMapping("/gallery")
	public String showDefault(Model mod) {
		mod.addAttribute("settings", siteSettingsService.get());
		mod.addAttribute("childAlbums", albumService.getRoot());
		mod.addAttribute("childItems", itemService.getNonAlbum());
		return "gallery/gallery";
	}

	@RequestMapping(value = "/gallery/{album}", method = RequestMethod.GET)
	public String viewAlbum(Model mod, @PathVariable("album") BigDecimal album) {
		try {
			Album valid = albumService.getById(album);
			if (valid == null) {
				throw new Exception("Album does not exist.");
			}
			mod.addAttribute("currentAlbum", valid);
		} catch (Exception e) {
			log.error("Issue checking album", e);
			mod.addAttribute("error", "Could not find album");
			return "gallery/gallery";
		}
		
		mod.addAttribute("settings", siteSettingsService.get());
		mod.addAttribute("breadcrumbs", albumService.getBreadcrumbById(album));
		mod.addAttribute("childAlbums", albumService.getByParent(album));
		mod.addAttribute("childItems", itemService.getByAlbum(album));
		return "gallery/gallery";
	}

	@RequestMapping(value = "/gallery/create", method = RequestMethod.POST)
	public String createAlbum(Model mod, Principal user, @Valid Album album, BindingResult result) {
		if (result.hasErrors()) {
			mod.addAttribute("error", result.getFieldError().getDefaultMessage());
			return showDefault(mod);
		}
		try {
			albumService.create(album);
			mod.addAttribute("success", "Successfully created album.");
		} catch (DuplicateKeyException e) {
			log.error("You must supply a unique album name!", e);
			mod.addAttribute("error", "You must supply a unique album name!");
		}
		catch (Exception e) {
			log.error("Had error creating album", e);
			mod.addAttribute("error", "Could not create album");
		}
		if (album.getParentId() != null) {
			return viewAlbum(mod, album.getParentId());
		} else {
			return showDefault(mod);
		}
	}
	
	@RequestMapping(value="/gallery/upload", method = RequestMethod.POST)
	public String uploadItems(Model mod, @RequestParam(value = "parentId", required = false) BigDecimal parentId, MultipartHttpServletRequest req) {
		List<MultipartFile> items = req.getFiles("items");
		try {
			itemService.uploadAll(items, parentId);
		} catch (IOException e) {
			log.error("Had an issue uploading files", e);
			mod.addAttribute("error", "Could not upload files.");
		}
		if(parentId != null){
			return viewAlbum(mod, parentId);
		} else {
			return showDefault(mod);
		}
	}

	public void setAlbumService(AlbumService albumService) {
		this.albumService = albumService;
	}

	public void setItemService(ItemService itemService) {
		this.itemService = itemService;
	}
	
	public void setSiteSettingsService(SiteSettingsService siteSettingsService) {
		this.siteSettingsService = siteSettingsService;
	}
}
