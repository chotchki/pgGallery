package pgGallery.web.gallery;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import pgGallery.AjaxResponse;
import pgGallery.db.pojo.Album;
import pgGallery.db.pojo.Item;
import pgGallery.db.service.AlbumService;
import pgGallery.db.service.ItemService;
import pgGallery.db.service.SiteSettingsService;

@Controller
@RequestMapping("/gallery/album")
public class AlbumController {
	protected final Logger log = LoggerFactory.getLogger(AlbumController.class);
	
	@Autowired
	private AlbumService albumService = null;
	
	@Autowired
	private ItemService itemService = null;
	
	@Autowired 
	private SiteSettingsService siteSettingsService = null;
	
	@RequestMapping(value = "/{albumId}", method = RequestMethod.GET)
	public String viewAlbum(Model mod, @PathVariable("albumId") BigDecimal albumId, RedirectAttributes rattr) {
		try {
			Album valid = albumService.getById(albumId);
			if (valid == null) {
				rattr.addFlashAttribute("error", "Album does not exist.");
				return "redirect:/gallery";
			}
			mod.addAttribute("currentAlbum", valid);
			mod.addAttribute("settings", siteSettingsService.get());
			mod.addAttribute("breadcrumbs", albumService.getBreadcrumbById(albumId));
			mod.addAttribute("childAlbums", albumService.getByParent(albumId));
			mod.addAttribute("childItems", itemService.getByAlbum(albumId));
			return "gallery/gallery";
		} catch (Exception e) {
			log.error("Issue checking album", e);
			rattr.addFlashAttribute("error", "Could not find album.");
			return "redirect:/gallery";
		}
	}
	
	@RequestMapping(value = "/{albumId}", method = RequestMethod.POST)
	public @ResponseBody AjaxResponse editAlbum(Model mod, @PathVariable("albumId") BigDecimal albumId,
			@Valid Album sub_album, BindingResult res_album) {
		AjaxResponse a = new AjaxResponse();
		
		if(res_album.hasErrors()) {
			a.error(res_album.getFieldError().getDefaultMessage());
			return a;
		}
		try {
			Album db_album = albumService.getById(albumId);
			db_album.apply(sub_album);
			albumService.update(db_album);
		} catch(Exception e) {
			log.error("Had an error updating the album.", e);
			a.error(e.getLocalizedMessage());
		}
		return a;
	}
	
	@RequestMapping(value = "/{albumId}/thumb", method = RequestMethod.GET)
	public String viewAlbumThumbnail(Model mod, @PathVariable("albumId") BigDecimal albumId, HttpServletResponse res){
		try{
			Album album = albumService.getById(albumId);
			if(album.getDefaultId() != null) {
				return "redirect:/gallery/item/" + album.getDefaultId().toPlainString() + "/thumb";
			}
			
			List<Item> items = itemService.getByAlbum(albumId);
			if(items.isEmpty()) {
				res.sendError(500);
				return null;
			} else if (items.size() == 1) {
				return "redirect:/gallery/item/" + items.get(0).getId().toPlainString() + "/thumb";
			} else {
				Random r = new Random();
				int rItem = r.nextInt(items.size() - 1);
				return "redirect:/gallery/item/" + items.get(rItem).getId().toPlainString() + "/thumb";
			}
		} catch (Exception e){
			log.error("Had an error getting the thumbnail", e);
			try {
				res.sendError(500);
			} catch (IOException e1) {
				log.error("Could not respond with a 500 error", e1);
			}
			return null;
		}
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public String createAlbum(Model mod, Principal user, @Valid Album album, BindingResult result, RedirectAttributes rattr) {
		if (result.hasErrors()) {
			rattr.addFlashAttribute("error", result.getFieldError().getDefaultMessage());
			if (album.getParentId() != null) {
				return "redirect:/gallery/album/" + album.getParentId();
			} else {
				return "redirect:/gallery";
			}
		}
		try {
			albumService.create(album);
			rattr.addFlashAttribute("success", "Successfully created album.");
		} catch (DuplicateKeyException e) {
			log.error("You must supply a unique album name!", e);
			rattr.addFlashAttribute("error", "You must supply a unique album name!");
		}
		catch (Exception e) {
			log.error("Had error creating album", e);
			rattr.addFlashAttribute("error", "Could not create album");
		}
		if (album.getParentId() != null) {
			return "redirect:/gallery/album/" + album.getParentId();
		} else {
			return "redirect:/gallery";
		}
	}

}
