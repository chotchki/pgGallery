package pgGallery.web;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import pgGallery.db.pojo.User;
import pgGallery.db.service.UserService;
import pgGallery.form.pojo.RegistrationForm;


@Controller
@RequestMapping("/register")
public class RegisterController {
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private UserService userService = null;
	
	@ModelAttribute("form")
	public RegistrationForm getRegistrationObject(){
		return new RegistrationForm();
	}

	@RequestMapping(method = RequestMethod.GET)
	public String showRegistration(Model mod){
		return "register";
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public String signUp(@ModelAttribute("form") @Valid RegistrationForm form, BindingResult result, Model mod, RedirectAttributes rattr){
		if(result.hasErrors()){
			mod.addAttribute("error", result.getFieldError().getDefaultMessage());
			return "register";
		}
		
		if(!form.getRetypePassword().equals(form.getUser().getPassword())){
			mod.addAttribute("error", "You must retype the password correctly.");
			return "register";
		}
		
		User regUser = form.getUser();
		try {
			regUser.hashPassword();
			userService.create(regUser);
		} catch (Exception e){
			log.error("Had a sign up error", e);
			mod.addAttribute("error", "Had an issue during registration.");
			return "register";
		}
		
		rattr.addFlashAttribute("success", "Congrats on signing up!");
		return "redirect:/";
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}
