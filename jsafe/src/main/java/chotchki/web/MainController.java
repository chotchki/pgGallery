package chotchki.web;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;

import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import chotchki.security.SHA512PasswordEncoding;

@Controller
public class MainController {
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	@RequestMapping("/")
	public String showIndexPage(Model mod) throws NoSuchAlgorithmException, InvalidKeyException{
		return "index";
	}
}
