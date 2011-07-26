package chotchki.web.gallery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import chotchki.db.service.AlbumService;

@Controller
public class GalleryController {
	@Autowired
	private AlbumService albumService = null;
	
	@RequestMapping("/gallery")
	public String showDefault(Model mod){
		mod.addAttribute("albums", albumService.getRootAlbums());
		return "gallery/gallery";
	}

	@RequestMapping("/gallery/{album}")
	public String viewAlbum(){
		return "gallery/gallery";
	}

	public void setAlbumService(AlbumService albumService) {
		this.albumService = albumService;
	}
}
