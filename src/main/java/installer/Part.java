package installer;

import installer.util.Slf4jPrintWriter;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Connection;

import org.apache.ibatis.jdbc.ScriptRunner;
import org.apache.ibatis.jdbc.SqlRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class Part implements Comparable<Part> {
	private static Logger log = LoggerFactory.getLogger(Part.class);
	protected final ScriptRunner scriptRunner;
	protected final SqlRunner sqlRunner;
	
	public Part(Connection conn) {
		scriptRunner = new ScriptRunner(conn);
		scriptRunner.setLogWriter(new Slf4jPrintWriter(false));
		scriptRunner.setErrorLogWriter(new Slf4jPrintWriter(true));
		
		sqlRunner = new SqlRunner(conn);
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
		
		InputStreamReader rdr = new InputStreamReader(is);
		
		log.info("Running install script {}", loaderLocation);
		scriptRunner.runScript(rdr);
	}
}
