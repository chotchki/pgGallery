package chotchki.form.pojo;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

public class RegistrationForm {
	
	@NotBlank(message="Username must not be blank")
	@Length(min=2, max=50,message="Username name can be between 2 and 50 characters")
	private String username = null;
	
	@NotBlank(message="Password cannot be blank")
	@Length(min=6, max=100, message="Password must be between 6 and 100 characters")
	private String password = null;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@NotBlank(message="Retype Password cannot be blank")
	@Length(min=6, max=100, message="Retype Password must be between 6 and 100 characters")
	private String retypePassword = null;
	
	public String getRetypePassword() {
		return retypePassword;
	}

	public void setRetypePassword(String retypePassword) {
		this.retypePassword = retypePassword;
	}


}
