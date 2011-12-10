package installer;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicBoolean;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class InstallerFilter implements Filter {
	
	private AtomicBoolean enabled = new AtomicBoolean(true);
	
	public void disable() {
		enabled.set(false);
	}

	@Override
	public void destroy() {}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain fc) throws IOException, ServletException {
		if(enabled.get()) {
			res.getOutputStream().write("Installer is working, please check your server logs.".getBytes());
		} else {
			fc.doFilter(req, res);
		}
	}

	@Override
	public void init(FilterConfig fc) throws ServletException {}

}
