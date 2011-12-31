package pgGallery.db.pojo;

import java.math.BigDecimal;

public class Thumbnail {
	private BigDecimal id = null;
	private BigDecimal contentId = null;
	private int height = -1;
	private int width = -1;
	private byte[] content = null;
	private String type = null;
	
	public BigDecimal getId() {
		return id;
	}
	public void setId(BigDecimal id) {
		this.id = id;
	}
	public BigDecimal getContentId() {
		return contentId;
	}
	public void setContentId(BigDecimal contentId) {
		this.contentId = contentId;
	}
	public int getHeight() {
		return height;
	}
	public void setHeight(int height) {
		this.height = height;
	}
	public int getWidth() {
		return width;
	}
	public void setWidth(int width) {
		this.width = width;
	}
	public byte[] getContent() {
		return content;
	}
	public void setContent(byte[] content) {
		this.content = content;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}
