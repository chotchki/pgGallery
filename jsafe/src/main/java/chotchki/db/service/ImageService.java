package chotchki.db.service;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.im4java.core.ConvertCmd;
import org.im4java.core.IM4JavaException;
import org.im4java.core.IMOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
	private final Logger log = LoggerFactory.getLogger(this.getClass());
	
	private static ConvertCmd cmd = new ConvertCmd(true);
	
	static {
		cmd.setSearchPath("C:\\Program Files (x86)\\GraphicsMagick-1.3.12-Q8");
	}

	public byte[] scale(byte[] input, int height, int width)
			throws IOException, InterruptedException, IM4JavaException {
		File inputFile = null;
		File outputFile = null;
		try {
			inputFile = File.createTempFile("input", ".tmp");
			outputFile = File.createTempFile("output", ".tmp");

			FileUtils.writeByteArrayToFile(inputFile, input);

			IMOperation op = new IMOperation();
			op.size(width, height);
			op.addImage(inputFile.getAbsolutePath());
			op.resize(width, height);
			op.p_profile("*");
			op.addImage(outputFile.getAbsolutePath());
			log.debug("Command will be {}", op);
			synchronized (cmd) {
				cmd.run(op);
			}

			return FileUtils.readFileToByteArray(outputFile);
		} finally {
			inputFile.delete();
			outputFile.delete();
		}
	}
}
