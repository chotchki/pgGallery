package installer.classpath;

import installer.Part;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Methods for loading classes from the classpath. Technique used from:
 * http://snippets.dzone.com/posts/show/4831
 * @author chotchki
 *
 */
public class ScanningLoader {
	private static Logger log = LoggerFactory.getLogger(ScanningLoader.class);
	
	private static final String PACKAGE = "installer.parts";
	
	 /**
     * Scans all classes accessible from the context class loader which belong to the given package and subpackages.
     *
     * @param packageName The base package
     * @return The classes
     * @throws ClassNotFoundException
     * @throws IOException
     */
    public static Set<Class<? extends Part>> getInstallParts()
            throws ClassNotFoundException, IOException {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        assert classLoader != null;
        Enumeration<URL> resources = classLoader.getResources(PACKAGE);
        List<File> dirs = new ArrayList<File>();
        while (resources.hasMoreElements()) {
            URL resource = resources.nextElement();
            dirs.add(new File(resource.getFile()));
        }
        Set<Class<? extends Part>> classes = new HashSet<Class<? extends Part>>();
        for (File directory : dirs) {
            classes.addAll(findClasses(directory, PACKAGE));
        }
        return classes;
    }

    /**
     * Recursive method used to find all classes in a given directory and subdirs.
     *
     * @param directory   The base directory
     * @param packageName The package name for classes found inside the base directory
     * @return The classes
     * @throws ClassNotFoundException
     */
    private static Set<Class<? extends Part>> findClasses(File directory, String packageName) throws ClassNotFoundException {
        Set<Class<? extends Part>> classes = new HashSet<Class<? extends Part>>();
        if (!directory.exists()) {
            return classes;
        }
        File[] files = directory.listFiles();
        for (File file : files) {
            if (file.isDirectory()) {
                assert !file.getName().contains(".");
                classes.addAll(findClasses(file, packageName + "." + file.getName()));
            } else if (file.getName().endsWith(".class")) {
            	Class<?> cls = Class.forName(packageName + '.' + file.getName().substring(0, file.getName().length() - 6));
            	if(cls.isAssignableFrom(Part.class)) {
            		log.debug("Loaded class {}", cls.getName());
            		classes.add((Class<? extends Part>) cls);
            	} else {
            		log.debug("Found an incompatible class {}", cls.getName());
            	}
            }
        }
        return classes;
    }
}
