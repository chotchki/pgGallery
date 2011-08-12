package chotchki.db.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chotchki.db.dao.ItemMapper;
import chotchki.db.pojo.Item;

@Service
public class ItemService {
	@Autowired
	private ItemMapper itemMapper = null;

	public List<Item> getNonAlbum(){
		return itemMapper.getNonAlbum();
	}
	
	public List<Item> getByAlbum(BigDecimal albumId){
		return itemMapper.getByAlbum(albumId);
	}

	public Item getById(BigDecimal id){
		return itemMapper.getById(id);
	}

	public Item create(Item item){
		return itemMapper.create(item);
	}
	
	public void update(Item item){
		itemMapper.update(item);
	}

	public void setItemMapper(ItemMapper itemMapper) {
		this.itemMapper = itemMapper;
	}
}
