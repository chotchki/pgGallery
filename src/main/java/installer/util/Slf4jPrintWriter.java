package installer.util;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Slf4jPrintWriter extends PrintWriter {
	private static Logger log = LoggerFactory.getLogger(Slf4jPrintWriter.class);
	
	private final boolean errorLevel;
	
	private StringBuffer buffer = new StringBuffer(); 
	
	public Slf4jPrintWriter(boolean errorLevel) {
		super(new StringWriter()); //a no op so we can construct the class
		this.errorLevel = errorLevel;
	}
	
	@Override
	public void print(Object obj) {
		buffer.append(obj);
	}
	
	@Override
	public void println(Object obj) {
		buffer.append(String.valueOf(obj));
		if(errorLevel) {
			log.error(buffer.toString());
		} else {
			log.debug(buffer.toString());
		}
		buffer = new StringBuffer();
	}
	
	@Override
	public void flush() {}
}
