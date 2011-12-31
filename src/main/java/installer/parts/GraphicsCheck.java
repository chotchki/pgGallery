package installer.parts;

import java.io.File;
import java.sql.Connection;

import org.apache.commons.io.FileUtils;

import pgGallery.db.service.ImageService;


import installer.Part;

public class GraphicsCheck extends Part {

	public GraphicsCheck(Connection conn) {
		super(conn);
	}

	@Override
	public long priority() {
		return 2;
	}
	
	@Override
	public boolean isInstalled() throws Exception {
		return false;
	}
	
	@Override
	public void install() throws Exception {
		ImageService is = new ImageService();
		byte[] checkImg = FileUtils.readFileToByteArray(new File(this.getClass().getResource("GraphicsCheck.png").toURI()));
		byte[] scale = is.scale(checkImg, 4, 4);
		if(scale.length == 0) {
			throw new Exception("Scaling failed!");
		}
	}
}
