package chotchki.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	@RequestMapping("/")
	public String showIndexPage(Model mod){
		return "index";
	}
}
