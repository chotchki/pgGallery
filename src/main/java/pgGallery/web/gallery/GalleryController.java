package pgGallery.web.gallery;

import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;
import java.util.Random;

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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import pgGallery.AjaxResponse;
import pgGallery.db.pojo.Album;
import pgGallery.db.pojo.Item;
import pgGallery.db.pojo.Thumbnail;
import pgGallery.db.service.AlbumService;
import pgGallery.db.service.ItemContentService;
import pgGallery.db.service.ItemService;
import pgGallery.db.service.SiteSettingsService;
import pgGallery.db.service.ThumbnailService;


@Controller
@RequestMapping("/gallery")
public class GalleryController {
	protected final Logger log = LoggerFactory.getLogger(GalleryController.class);

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


	
	@RequestMapping(value="/item/upload", method = RequestMethod.POST)
	public String uploadItems(Model mod, @RequestParam(value = "parentId", required = false) BigDecimal parentId, MultipartHttpServletRequest req, RedirectAttributes rattr) {
		List<MultipartFile> items = req.getFiles("items[]");
		try {
			itemService.uploadAll(items, parentId);
		} catch (Exception e) {
			log.error("Had an issue uploading files", e);
			rattr.addFlashAttribute("error", "Had an error uploading files.");
		}
		rattr.addFlashAttribute("success", "Successfully uploaded " + items.size() + " items.");
		if(parentId != null){
			return "redirect:/gallery/album/" + parentId;
		} else {
			return "redirect:/gallery";
		}
	}

	@RequestMapping(value = "/item/{itemId}")
	public String viewItem(Model mod, @PathVariable("itemId") BigDecimal itemId, RedirectAttributes rattr){
		try {
			Item item = this.itemService.getById(itemId);
			mod.addAttribute("item", item);
			mod.addAttribute("breadcrumbs", albumService.getBreadcrumbById(item.getAlbumId()));
		} catch (Exception e) {
			log.error("Had an error loading the item",e);
			rattr.addFlashAttribute("error", "Had an error loading the item");
			return "redirect:/gallery";
		}
		return "gallery/item";
	}
	
	@RequestMapping(value = "/item/{itemId}", method = RequestMethod.DELETE)
	public @ResponseBody AjaxResponse deleteItem(Model mod, @PathVariable("itemId") BigDecimal itemId){
		AjaxResponse a = new AjaxResponse();
		Item item = null;
		try {
			item = itemService.getById(itemId);
			if(item == null) {
				return a.error("Item does not exist to delete.");
			}
			itemService.delete(item);
			return a.success("Successfully deleted " + item.getName());
		} catch (Exception e) {
			log.error("Had an error deleting the item.",e);
			return a.error("Had an error deleting the item.");
		}
	}
	
	@RequestMapping(value = "/item/{itemId}/main")
	public void viewMain(@PathVariable("itemId") BigDecimal itemId, HttpServletResponse res, OutputStream output){
		try{
			Item item = this.itemService.getById(itemId);
			res.setContentType(item.getMimeType());
			
			Thumbnail thumb = this.thumbnailService.getMainByItemId(item.getId());
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
	
	@RequestMapping(value = "/item/{itemId}/thumb")
	public void viewThumbnail(@PathVariable("itemId") BigDecimal itemId, HttpServletResponse res, OutputStream output){
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
	
	@RequestMapping(value = "/item/{itemId}/rotate/left", method = RequestMethod.POST)
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
	
	@RequestMapping(value = "/item/{itemId}/rotate/right", method = RequestMethod.POST)
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
