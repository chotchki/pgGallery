package pgGallery.form.pojo;

import javax.validation.Valid;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import pgGallery.db.pojo.User;


public class RegistrationForm {
	
	@Valid
	private User user = null;
	
	@NotBlank(message="The retyped password cannot be blank")
	@Length(min=6, max=100, message="The retyped password must be between 6 and 100 characters")
	private String retypePassword = null;
	
	public String getRetypePassword() {
		return retypePassword;
	}

	public void setRetypePassword(String retypePassword) {
		this.retypePassword = retypePassword;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}


}
