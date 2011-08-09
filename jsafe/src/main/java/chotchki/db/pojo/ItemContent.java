package chotchki.db.pojo;

import java.math.BigDecimal;

public class ItemContent {
	private BigDecimal itemId = null;
	private byte[] content = null;
	private boolean active = false;
	private byte[] contentHash = null;

	public BigDecimal getItemId() {
		return itemId;
	}
	public void setItemId(BigDecimal itemId) {
		this.itemId = itemId;
	}
	public byte[] getContent() {
		return content;
	}
	public void setContent(byte[] content) {
		this.content = content;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public byte[] getContentHash() {
		return contentHash;
	}
	public void setContentHash(byte[] contentHash) {
		this.contentHash = contentHash;
	}
}
