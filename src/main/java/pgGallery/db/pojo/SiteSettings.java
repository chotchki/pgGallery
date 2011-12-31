package pgGallery.db.pojo;

public class SiteSettings {
	private int id = 1;
	private int itemsPerPage = 24;
	private int thumbHeight = 100;
	private int thumbWidth = 100;
	private int mainHeight = 500;
	private int mainWidth = 500;
	
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
