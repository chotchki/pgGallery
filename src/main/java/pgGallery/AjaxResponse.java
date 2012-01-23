package pgGallery;

public class AjaxResponse {
	public static final String SUCCESS = "success";
	public static final String ERROR = "error";
	
	private String status = SUCCESS;
	private String message = null;
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	/**
	 * Simple way to respond with an error.
	 * @param message The error message.
	 */
	public AjaxResponse error(String message) {
		status = ERROR;
		this.message = message;
		return this;
	}
	
	/**
	 * Simple way to respond with a success.
	 * @param message The success message.
	 */
	public AjaxResponse success(String message) {
		status = SUCCESS;
		this.message = message;
		return this;
	}
}
