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

	public List<Item> getNonAlbumItems(){
		return itemMapper.getNonAlbumItems();
	}
	
	public List<Item> getItemsByAlbum(BigDecimal albumId){
		return itemMapper.getItemsByAlbum(albumId);
	}

	public Item getItemById(BigDecimal id){
		return itemMapper.getItemById(id);
	}

	public Item createItem(Item item){
		return itemMapper.createItem(item);
	}
	
	public void updateItem(Item item){
		itemMapper.updateItem(item);
	}

	public void setItemMapper(ItemMapper itemMapper) {
		this.itemMapper = itemMapper;
	}
}
