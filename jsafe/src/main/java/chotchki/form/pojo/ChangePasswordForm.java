package chotchki.form.pojo;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

public class ChangePasswordForm {
	@NotBlank(message="Current Password cannot be blank")
	@Length(min=6, max=100, message="Current Password must be between 6 and 100 characters")
	private String currentPassword = null;
	
	@NotBlank(message="New Password cannot be blank")
	@Length(min=6, max=100, message="New Password must be between 6 and 100 characters")
	private String newPassword = null;
	
	@NotBlank(message="Retype Password cannot be blank")
	@Length(min=6, max=100, message="Retype Password must be between 6 and 100 characters")
	private String retypePassword = null;

	public String getCurrentPassword() {
		return currentPassword;
	}

	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getRetypePassword() {
		return retypePassword;
	}

	public void setRetypePassword(String retypePassword) {
		this.retypePassword = retypePassword;
	}
}
