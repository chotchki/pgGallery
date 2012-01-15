package pgGallery.db.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import pgGallery.db.pojo.User;


public interface UserMapper {
	@Select("SELECT * FROM users WHERE username = #{username}")
	public User get(@Param("username") String username);
	
	@Insert("INSERT INTO users(username,password, enabled, admin) values (#{username}, #{password}, #{enabled}, #{admin})")
	public void create(User user);
	
	@Update("UPDATE users SET username = #{username}, password = #{password}, enabled = #{enabled}, admin = #{admin} WHERE username = #{username}")
	public void update(User user);
}
