package chotchki.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyTagSupport;
import javax.servlet.jsp.tagext.Tag;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LinkTag extends BodyTagSupport {
	private static final long serialVersionUID = -3961102717079522877L;
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	public int doAfterBody() throws JspException{
		JspWriter out = this.getPreviousOut();
		try {
			out.append(this.pageContext.getServletContext().getContextPath());
			out.append(this.getBodyContent().getString());
		} catch (IOException e) {
			log.error("Had an error writing out the jsp contents.", e);
			throw new JspException(e);
		}
		return Tag.SKIP_BODY;
	}
}
