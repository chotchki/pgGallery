package pgGallery.db.pojo;

import java.math.BigDecimal;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

public class Item {
	private BigDecimal id = null;
	private BigDecimal albumId = null;
	
	@NotBlank(message = "Item name cannot be blank")
	@Length(min = 1, max = 100, message = "Item name must be between 1 and 100 characters")
	private String name = null;
	
	private String mimeType = null;
	
	private boolean duplicate = false;
	
	public BigDecimal getId() {
		return id;
	}
	public void setId(BigDecimal id) {
		this.id = id;
	}
	public BigDecimal getAlbumId() {
		return albumId;
	}
	public void setAlbumId(BigDecimal albumId) {
		this.albumId = albumId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMimeType() {
		return mimeType;
	}
	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}
	public boolean isDuplicate() {
		return duplicate;
	}
	public void setDuplicate(boolean duplicate) {
		this.duplicate = duplicate;
	}
}