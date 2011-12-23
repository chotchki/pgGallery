package installer;

import java.io.InputStream;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.SystemUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class Part implements Comparable<Part> {
	private static Logger log = LoggerFactory.getLogger(Part.class);
	protected final QueryRunner queryRunner;
	
	public Part(DataSource dataSource) {
		queryRunner = new QueryRunner(dataSource);
	}
	
	public abstract long priority();
	
	public int compareTo(Part o) {
		return new Long(this.priority()).compareTo(o.priority());
	}
	
	public abstract boolean isInstalled() throws Exception;
	
	public void install() throws Exception {
		//Get the current class with its full name
		String loaderLocation = this.getClass().getName();
		loaderLocation = loaderLocation.replaceAll("\\.", "/");
		loaderLocation = "/" + loaderLocation + ".sql";
		
		InputStream is = this.getClass().getResourceAsStream(loaderLocation);
		if(is == null) {
			throw new Exception("Loader script " + loaderLocation + " does not exist.");
		}
		List<String> lines = IOUtils.readLines(is, "UTF-8");
		
		String script = StringUtils.join(lines, SystemUtils.LINE_SEPARATOR);
		
		log.info("Running install script {}", loaderLocation);
		queryRunner.batch(script, new Object[0][0]);
	}
	
	/**
	 * Private handler to return the count(*) as an int.
	 * @author chotchki
	 *
	 */
	protected class CountHandler implements ResultSetHandler<Integer> {
		public CountHandler() {}
		
		@Override
		public Integer handle(ResultSet rs) throws SQLException {
			if(!rs.next()) {
				return 0;
			}
			
			return rs.getInt(1);
		}
		
	}
}
