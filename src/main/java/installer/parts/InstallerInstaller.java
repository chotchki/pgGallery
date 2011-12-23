package installer.parts;

import javax.sql.DataSource;

import installer.Part;

public class InstallerInstaller extends Part {

	public InstallerInstaller(DataSource dataSource) {
		super(dataSource);
	}

	@Override
	public Class<? extends Part>[] getDependencies() {
		return null;
	}

	@Override
	public boolean isInstalled() throws Exception {
		int count = queryRunner.query("SELECT count(*) FROM pg_table WHERE tablename='pgGalleryInstaller'", new CountHandler());
		if(count > 1) {
			return true;
		} else {
			return false;
		}
	}
}
