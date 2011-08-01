package chotchki.security;

import static org.junit.Assert.*;
import static  org.hamcrest.CoreMatchers.*;

import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.joda.time.Interval;
import org.junit.Test;

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

}
