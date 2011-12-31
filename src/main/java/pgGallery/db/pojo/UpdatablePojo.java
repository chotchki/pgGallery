package pgGallery.db.pojo;

import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class UpdatablePojo {
	private static final Logger log = LoggerFactory.getLogger(UpdatablePojo.class);
	
	private boolean applyRun = false;
	private boolean applyChanged = false;

	public void apply(UpdatablePojo newPojo) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
		BeanUtilsBean beanUtil = new BeanUtilsBean();
		
		@SuppressWarnings("unchecked")
		Map<String, Object> oldProps =  beanUtil.describe(this);
		
		@SuppressWarnings("unchecked")
		Map<String, Object> newProps =  beanUtil.describe(newPojo);
		
		//We have the current and new properties, loop through and see if any are different
		//Ignore applyRun and applyChanged
		for(Iterator<String> iKeys = newProps.keySet().iterator(); iKeys.hasNext();) {
			String key = iKeys.next();
			if(key.equals("applyRun") || key.equals("applyChanged")) {
				log.debug("Skipping internal properties");
				continue;
			}
			if(!oldProps.containsKey(key)) {
				log.debug("Property {} does not exist in this object, skipping", key);
				continue;
			}
			Object oldVal = oldProps.get(key);
			Object newVal = newProps.get(key);
			if(oldVal == null && newVal == null) {
				log.debug("Both arguments are null, skipping. Key: {}", key);
				continue;
			}
			if(oldVal == null && newVal != null) {
				log.debug("Copying not null. Key {} New Val {}", key, newVal);
				oldProps.put(key, newVal);
				applyChanged = true;
				continue;
			}
			if(oldVal != null && newVal == null) {
				log.debug("Copying null. Key {} Old Val {}", key, oldVal);
				oldProps.put(key, null);
				applyChanged = true;
				continue;
			}
			if(oldVal instanceof String && newVal instanceof String) {
				String oldValStr = (String) oldVal;
				String newValStr = (String) newVal;
				if(oldValStr.toUpperCase().equals(newValStr.toUpperCase())) {
					log.debug("Strings are equal, not copying. Key {}, Old Val {}, New Val {}", Arrays.asList(key,oldValStr, newValStr));
					continue;
				}
				log.debug("Strings are not equal, copying. Key {}, Old Val {}, New Val {}", Arrays.asList(key,oldValStr, newValStr));
				oldProps.put(key, newVal);
				applyChanged = true;
				continue;
			} else if (!oldVal.equals(newVal)) {
				oldProps.put(key, newVal);
				applyChanged = true;
				log.debug("Not equal, copying. Key {}, Old Val {}, New Val {}", Arrays.asList(key,oldVal, newVal));
			}
		}
		beanUtil.populate(this, oldProps);
		applyRun = true;
	}

	public boolean isApplyRun() {
		return applyRun;
	}

	public boolean isApplyChanged() {
		return applyChanged;
	}
}
