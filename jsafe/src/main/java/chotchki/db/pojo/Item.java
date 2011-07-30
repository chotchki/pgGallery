package chotchki.db.pojo;

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
	private byte[] contentHash = null;
	private String owner = null;
	private byte[] content = null;
	
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
	public byte[] getContentHash() {
		return contentHash;
	}
	public void setContentHash(byte[] contentHash) {
		this.contentHash = contentHash;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public byte[] getContent() {
		return content;
	}
	public void setContent(byte[] content) {
		this.content = content;
	}
}