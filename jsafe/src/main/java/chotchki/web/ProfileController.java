package chotchki.web;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import chotchki.db.pojo.User;
import chotchki.db.service.UserService;
import chotchki.form.pojo.ChangePasswordForm;
import chotchki.security.SHA512PasswordEncoder;

@Controller
@RequestMapping("/profile")
public class ProfileController {
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private UserService userService = null;
	
	@RequestMapping(method = RequestMethod.GET)
	public String showProfile(Model mod, Principal principal){
		mod.addAttribute("username", principal.getName());
		return "profile";
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public String changePassword(ChangePasswordForm form, BindingResult result, Model mod, Principal principal){
		if(result.hasErrors()){
			mod.addAttribute("error", result.getFieldError().getDefaultMessage());
			return "profile";
		}
		if(!form.getNewPassword().equals(form.getRetypePassword())){
			mod.addAttribute("error", "You must retype the password correctly.");
			return "profile";
		}
		try {
			User user = userService.getUser(principal.getName());
			SHA512PasswordEncoder hasher = new SHA512PasswordEncoder();
			if(!hasher.isPasswordValid(user.getPassword(), form.getCurrentPassword(), null)){
				mod.addAttribute("error", "Current password is wrong.");
				return "profile";
			}
			user.setPassword(form.getNewPassword());
			user.hashPassword();
			
			userService.updateUser(user);
			mod.addAttribute("success", "Password Changed Successfully!");
			return "profile";
		} catch (Exception e){
			mod.addAttribute("error", "Had an issue changing the password");
			return "profile";
		}
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}
