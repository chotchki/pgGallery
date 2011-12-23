package installer;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class InstallerFilter implements Filter {

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain fc) throws IOException, ServletException {
		if(InstallerFlag.INSTANCE.enabled.get()) {
			res.getOutputStream().write("Installer is working, please check your server logs.".getBytes());
		} else {
			fc.doFilter(req, res);
		}
	}
	
	@Override
	public void init(FilterConfig fc) throws ServletException {}

	@Override
	public void destroy() {}
}