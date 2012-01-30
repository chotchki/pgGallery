package installer.parts;

import java.sql.Connection;

import installer.Part;

public class IsAlbumPublic extends Part {

	public IsAlbumPublic(Connection conn) {
		super(conn);
	}

	@Override
	public long priority() {
		return 5;
	}

}
