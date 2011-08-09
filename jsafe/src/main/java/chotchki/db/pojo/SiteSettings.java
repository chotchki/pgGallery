package chotchki.db.pojo;

public class SiteSettings {
	private int id = 1;
	private int itemsPerPage = -1;
	private int thumbHeight = -1;
	private int thumbWidth = -1;
	private int mainHeight = -1;
	private int mainWidth = -1;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getItemsPerPage() {
		return itemsPerPage;
	}
	public void setItemsPerPage(int itemsPerPage) {
		this.itemsPerPage = itemsPerPage;
	}
	public int getThumbHeight() {
		return thumbHeight;
	}
	public void setThumbHeight(int thumbHeight) {
		this.thumbHeight = thumbHeight;
	}
	public int getThumbWidth() {
		return thumbWidth;
	}
	public void setThumbWidth(int thumbWidth) {
		this.thumbWidth = thumbWidth;
	}
	public int getMainHeight() {
		return mainHeight;
	}
	public void setMainHeight(int mainHeight) {
		this.mainHeight = mainHeight;
	}
	public int getMainWidth() {
		return mainWidth;
	}
	public void setMainWidth(int mainWidth) {
		this.mainWidth = mainWidth;
	}
}
