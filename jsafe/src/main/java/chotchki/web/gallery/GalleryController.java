package chotchki.web.gallery;

import java.math.BigDecimal;
import java.security.Principal;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import chotchki.db.pojo.Album;
import chotchki.db.service.AlbumService;
import chotchki.db.service.ItemService;

@Controller
public class GalleryController {
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private AlbumService albumService = null;
	
	@Autowired
	private ItemService itemService = null;
	
	@RequestMapping("/gallery")
	public String showDefault(Model mod){
		mod.addAttribute("childAlbums", albumService.getRootAlbums());
		mod.addAttribute("childItems", itemService.getNonAlbumItems());
		return "gallery/gallery";
	}

	@RequestMapping(value = "/gallery/{album}", method = RequestMethod.GET)
	public String viewAlbum(Model mod, @PathVariable("album") BigDecimal album){
		try{
			Album valid = albumService.getAlbumById(album);
			if(valid == null){
				throw new Exception("Album does not exist.");
			}
			mod.addAttribute("album", valid);
		} catch (Exception e){
			log.error("Issue checking album", e);
			mod.addAttribute("error", "Could not find album");
			return "gallery/gallery";
		}
		
		mod.addAttribute("childAlbums", albumService.getAlbumsByParent(album));
		mod.addAttribute("childItems", itemService.getItemsByAlbum(album));
		return "gallery/gallery";
	}
	
	@RequestMapping(value = "/gallery/create", method = RequestMethod.POST)
	public String createAlbum(Model mod, Principal user, @Valid Album album, BindingResult result){
		if(result.hasErrors()){
			mod.addAttribute("error", result.getFieldError().getDefaultMessage());
			return showDefault(mod);
		}
		try{
			albumService.createAlbum(album);
			return showDefault(mod);
		} catch (Exception e){
			log.error("Had error creating album", e);
			mod.addAttribute("error", "Could not create album");
			return showDefault(mod);
		}
	}
	
	@RequestMapping(value = "/gallery/{album}/create", method = RequestMethod.POST)
	public String createAlbum(Model mod, @PathVariable("album") BigDecimal parentAlbum, Principal user, @Valid Album album, BindingResult result){
		if(result.hasErrors()){
			mod.addAttribute("error", result.getFieldError().getDefaultMessage());
			return viewAlbum(mod, parentAlbum);
		}
		
		try{
			Album valid = albumService.getAlbumById(parentAlbum);
			if(valid == null){
				throw new Exception("Parent Album does not exist");
			}
		} catch (Exception e){
			log.error("Had issue with parent album", e);
			mod.addAttribute("error", "Parent Album does not exist");
			return viewAlbum(mod, parentAlbum);
		}
		
		album.setParentId(parentAlbum);
		
		try{
			albumService.createAlbum(album);
			return viewAlbum(mod, parentAlbum);
		} catch (Exception e){
			log.error("Had error creating album", e);
			mod.addAttribute("error", "Could not create album");
			return viewAlbum(mod, parentAlbum);
		}
	}
	
	public void setAlbumService(AlbumService albumService) {
		this.albumService = albumService;
	}

	public void setItemService(ItemService itemService) {
		this.itemService = itemService;
	}
}
