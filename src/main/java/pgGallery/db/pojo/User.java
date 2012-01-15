package pgGallery.db.pojo;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import pgGallery.security.SHA512PasswordEncoder;


public class User {
	@NotBlank(message="Username must not be blank")
	@Length(min=2, max=50,message="Username name can be between 2 and 50 characters")
	private String username = null;
	
	@NotBlank(message="Password cannot be blank")
	@Length(min=6, max=100, message="Password must be between 6 and 100 characters")
	private String password = null;
	
	private boolean enabled = false;
	
	private boolean admin = false;
	
	public void hashPassword(){
		SHA512PasswordEncoder hasher = new SHA512PasswordEncoder();
		password = hasher.encodePassword(password, null);
	}
	
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

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}
}
