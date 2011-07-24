package chotchki.db.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import chotchki.db.dao.UserMapper;
import chotchki.db.pojo.User;

@Service
public class UserService {
	@Autowired
	private UserMapper userMapper = null;

	public User getUser(String username){
		return userMapper.getUser(username);
	}
	
	@Transactional
	public void createUser(User user){
		userMapper.createUser(user);
	}
	
	@Transactional
	public void updateUser(User user){
		userMapper.updateUser(user);
	}
	
	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}
}
