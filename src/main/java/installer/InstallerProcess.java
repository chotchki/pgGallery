package installer;

import installer.classpath.ScanningLoader;

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
		DataSource ds = null;
		try {
		   Context adminDataSource = (Context) new InitialContext();
		   ds = (DataSource) adminDataSource.lookup(INSTALLER_JNDI);
		   if(ds == null) {
			   throw new Exception("Lookup failed for the installer using the path " + INSTALLER_JNDI);
		   }
		} catch(Exception e) {
			log.error("Failed trying to find the installer datasource.", e);
		}
		
		try {
			List<Part> installParts = ScanningLoader.createParts(ds);

			for(Part p: installParts) {
				if(p.isInstalled()) {
					log.info("Part {} is already installed", p.getClass().getName());
				} else {
					log.info("Installing Part {}", p.getClass().getName());
					p.install();
				}
			}
			
			log.info("Installation Complete!");
			
			InstallerFlag.INSTANCE.enabled.set(false);
			log.info("Disabled the install filter");
		} catch (Exception e) {
			log.error("Installation process failed", e);
		}
	}
}
