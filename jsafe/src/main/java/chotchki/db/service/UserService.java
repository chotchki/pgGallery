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
		return userMapper.get(username);
	}
	
	@Transactional
	public void create(User user){
		userMapper.create(user);
	}
	
	@Transactional
	public void update(User user){
		userMapper.update(user);
	}
	
	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}
}
