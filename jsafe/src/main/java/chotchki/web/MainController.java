package chotchki.web;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	@RequestMapping("/")
	public String showIndexPage(Model mod) throws NoSuchAlgorithmException, InvalidKeyException{
		
		String password = "foo";
		KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA512");
		keyGen.init(512);
		SecretKey salt = keyGen.generateKey();
		
		Mac hmac = null;
		
		log.debug("Test 10");
		byte[] output = password.getBytes();
		for(int i = 0; i < 10; i++){
			hmac = Mac.getInstance("HmacSHA512");
			hmac.init(salt);
			output = hmac.doFinal(output);
		}
		log.debug("Test 10");
		
		log.debug("Test 10000");
		output = password.getBytes();
		for(int i = 0; i < 10000; i++){
			hmac = Mac.getInstance("HmacSHA512");
			hmac.init(salt);
			output = hmac.doFinal(output);
		}
		log.debug("Test 10000");
		
		
		return "index";
	}
}
