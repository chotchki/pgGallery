package installer.parts;

import java.sql.Connection;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import pgGallery.security.SHA512PasswordEncoder;

import installer.Part;

public class AdminFunctionality extends Part {
	private static Logger log = LoggerFactory.getLogger(AdminFunctionality.class);

	public AdminFunctionality(Connection conn) {
		super(conn);
	}

	@Override
	public long priority() {
		return 3;
	}

	@Override
	public void install() throws Exception {
		super.install();
		
		SHA512PasswordEncoder s = new SHA512PasswordEncoder();
		
		String tempPass = RandomStringUtils.randomAscii(12);
		
		this.sqlRunner.insert("INSERT INTO users(username, password, enabled, admin)" +
								"VALUES ('admin', ?, true, true)", s.encodePassword(tempPass, null));
		
		log.info("New Admin user created, user: admin , password: {} ", tempPass);
	}
}
