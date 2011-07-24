package chotchki.db.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import chotchki.db.pojo.User;

public interface UserMapper {
	@Select("SELECT * FROM users WHERE username = #{username}")
	public User getUser(@Param("username") String username);
	
	@Insert("INSERT INTO users(username,password) values (#{username}, #{password})")
	public void createUser(User user);
	
	@Update("UPDATE users SET username = #{username}, password = #{password} WHERE username = #{username}")
	public void updateUser(User user);
}
