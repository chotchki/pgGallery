package installer.parts;

import javax.sql.DataSource;

import installer.Part;

public class InstallerInstaller extends Part {

	public InstallerInstaller(DataSource dataSource) {
		super(dataSource);
	}
	
	@Override
	public long priority() {
		return 0;
	}

	@Override
	public boolean isInstalled() throws Exception {
		int count = queryRunner.query("SELECT count(*) FROM pg_tables WHERE tablename='pgGalleryInstaller'", new CountHandler());
		if(count > 1) {
			return true;
		} else {
			return false;
		}
	}
}
