package installer;

import installer.classpath.ScanningLoader;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class InstallerProcess implements ServletContextListener {
	private static Logger log = LoggerFactory.getLogger(InstallerProcess.class);
	private static final String INSTALLER_JNDI = "jdbc/installer";

	@Override
	public void contextDestroyed(ServletContextEvent sce) {}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		Connection conn = null;
		try {
		   Context adminDataSource = (Context) new InitialContext();
		   DataSource ds = (DataSource) adminDataSource.lookup(INSTALLER_JNDI);
		   if(ds == null) {
			   throw new Exception("Lookup failed for the installer using the path " + INSTALLER_JNDI);
		   }
		   conn = ds.getConnection();
		   if(conn == null) {
			   throw new Exception("Unable to establish a database connection");
		   }
		   conn.setAutoCommit(false);
		} catch(Exception e) {
			log.error("Failed try to connect to the database.", e);
			if(conn != null) {
				try {
					conn.close();
				} catch (SQLException e1) {}
			}
		}
		
		try {
			List<Part> installParts = ScanningLoader.createParts(conn);

			for(Part p: installParts) {
				if(p.isInstalled()) {
					log.info("Part {} is already installed", p.getClass().getName());
				} else {
					log.info("Installing Part {}", p.getClass().getName());
					p.install();
				}
			}
			conn.commit();
			log.info("Installation Complete!");
			
			InstallerFlag.INSTANCE.enabled.set(false);
			log.info("Disabled the install filter");
		} catch (Exception e) {
			log.error("Installation process failed", e);
		} finally {
			if(conn != null) {
				try {
					conn.close();
				} catch (SQLException e1) {}
			}
		}
	}
}
