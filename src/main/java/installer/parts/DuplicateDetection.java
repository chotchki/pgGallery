package installer.parts;

import java.sql.Connection;

import installer.Part;

public class DuplicateDetection extends Part {
	public DuplicateDetection(Connection conn) {
		super(conn);
	}

	@Override
	public long priority() {
		return 4;
	}

}
