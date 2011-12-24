package installer.parts;

import installer.Part;

import java.sql.Connection;

public class BaseSchema extends Part {

	public BaseSchema(Connection conn) {
		super(conn);
	}

	@Override
	public long priority() {
		return 1;
	}
}
