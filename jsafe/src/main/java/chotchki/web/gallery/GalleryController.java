package chotchki.web.gallery;

import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import chotchki.AjaxResponse;
import chotchki.db.pojo.Album;
import chotchki.db.pojo.Item;
import chotchki.db.pojo.Thumbnail;
import chotchki.db.service.AlbumService;
import chotchki.db.service.ItemContentService;
import chotchki.db.service.ItemService;
import chotchki.db.service.SiteSettingsService;
import chotchki.db.service.ThumbnailService;

@Controller
@RequestMapping("/gallery")
public class GalleryController {
	protected final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private AlbumService albumService = null;

	@Autowired
	private ItemService itemService = null;
	
	@Autowired
	private ItemContentService itemContentService = null;
	
	@Autowired 
	private SiteSettingsService siteSettingsService = null;
	
	@Autowired
	private ThumbnailService thumbnailService = null;

	@RequestMapping(method = RequestMethod.GET)
	public String showDefault(Model mod) {
		mod.addAttribute("settings", siteSettingsService.get());
		mod.addAttribute("childAlbums", albumService.getRoot());
		mod.addAttribute("childItems", itemService.getNonAlbum());
		return "gallery/gallery";
	}

	@RequestMapping(value = "/album/{album}", method = RequestMethod.GET)
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

	@RequestMapping(value = "/album/create", method = RequestMethod.POST)
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
	
	@RequestMapping(value="/item/upload", method = RequestMethod.POST)
	public String uploadItems(Model mod, @RequestParam(value = "parentId", required = false) BigDecimal parentId, MultipartHttpServletRequest req) {
		List<MultipartFile> items = req.getFiles("items[]");
		try {
			itemService.uploadAll(items, parentId);
		} catch (Exception e) {
			log.error("Had an issue uploading files", e);
			mod.addAttribute("error", "Could not upload files.");
		}
		if(parentId != null){
			return viewAlbum(mod, parentId);
		} else {
			return showDefault(mod);
		}
	}
	
	@RequestMapping(value = "/item/{itemId}/thumb")
	public void viewThumbnail(Model mod, @PathVariable("itemId") BigDecimal itemId, HttpServletResponse res, OutputStream output){
		try{
			Item item = this.itemService.getById(itemId);
			res.setContentType(item.getMimeType());
			
			Thumbnail thumb = this.thumbnailService.getThumbByItemId(item.getId());
			res.setContentLength(thumb.getContent().length);
			output.write(thumb.getContent());
		} catch (Exception e){
			log.error("Had an error getting the thumbnail", e);
			try {
				res.sendError(500);
			} catch (IOException e1) {
				log.error("Could not respond with a 500 error", e1);
			}
			return;
		}
	}
	
	@RequestMapping(value = "/item/{itemId}/rotate/left")
	public @ResponseBody AjaxResponse rotateLeft(Model mod, @PathVariable("itemId") BigDecimal itemId) {
		AjaxResponse a = new AjaxResponse();
		try {
			itemContentService.rotateLeftByItemId(itemId);
		} catch(Exception e) {
			log.error("Had an error rotating the image", e);
			a.error(e.getLocalizedMessage());
		}
		return a;
	}
	
	@RequestMapping(value = "/item/{itemId}/rotate/right")
	public @ResponseBody AjaxResponse rotateRight(Model mod, @PathVariable("itemId") BigDecimal itemId) {
		AjaxResponse a = new AjaxResponse();
		try {
			itemContentService.rotateRightByItemId(itemId);
		} catch(Exception e) {
			log.error("Had an error rotating the image", e);
			a.error(e.getLocalizedMessage());
		}
		return a;
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

	public void setThumbnailService(ThumbnailService thumbnailService) {
		this.thumbnailService = thumbnailService;
	}
}
