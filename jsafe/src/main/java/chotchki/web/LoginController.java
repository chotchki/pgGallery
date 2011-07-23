package chotchki.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/login")
public class LoginController {
	
	@RequestMapping(method = RequestMethod.GET)
	public String showLoginPage(){
		return "login";
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public String handleLogin(Model mod, @RequestParam("j_username") String user, @RequestParam("j_password") String pass){
		mod.addAttribute("username", user);
		mod.addAttribute("password", pass);
		return "login";
	}
}
