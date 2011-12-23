package installer;

import java.util.concurrent.atomic.AtomicBoolean;

public enum InstallerFlag {
	INSTANCE;
	
	public AtomicBoolean enabled = new AtomicBoolean(true);
}
