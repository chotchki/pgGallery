package pgGallery.security;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.not;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.math.BigInteger;
import java.util.Random;

import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.joda.time.Interval;
import org.junit.Test;

import pgGallery.security.SHA512PasswordEncoder;

public class SHA512PasswordEncoderTest {
	private SHA512PasswordEncoder encoder = new SHA512PasswordEncoder();

	@Test
	public void uniqueEncode() {
		String first = encoder.encodePassword("foo", null);
		String second = encoder.encodePassword("foo", null);
		
		assertThat(first, not(equalTo(second)));
	}
	
	@Test
	public void benchmark(){
		DateTime start = new DateTime();
		encoder.encodePassword("foo", null);
		DateTime end = new DateTime();
		
		Interval interval = new Interval(start,end);
		Duration duration = interval.toDuration();
		assertTrue(duration.isLongerThan(new Duration(1 * 1000)));
	}

	@Test
	public void matchExisting(){
		String hash = encoder.encodePassword("foo", null);
		assertTrue(encoder.isPasswordValid(hash, "foo", null));
	}
	
	@Test
	public void supportLong(){
		String password = new BigInteger(2000, new Random()).toString();
		String hash = encoder.encodePassword(password, null);
		assertTrue(encoder.isPasswordValid(hash, password, null));
	}
}
