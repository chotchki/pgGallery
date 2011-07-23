package chotchki.db.pojo;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import chotchki.security.SHA512PasswordEncoding;

public class User {
	@NotBlank(message="Username must not be blank")
	@Length(min=2, max=50,message="Username name can be between 2 and 50 characters")
	private String username = null;
	
	@NotBlank(message="Password cannot be blank")
	@Length(min=6, max=100, message="Password must be between 6 and 100 characters")
	private String password = null;
	
	public void hashPassword(){
		SHA512PasswordEncoding hasher = new SHA512PasswordEncoding();
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
}
