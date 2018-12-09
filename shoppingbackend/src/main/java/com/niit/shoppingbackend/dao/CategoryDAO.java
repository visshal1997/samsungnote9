package com.niit.shoppingbackend.dao;

import java.util.List;

import com.niit.shoppingbackend.dto.Category;

public interface CategoryDAO {

	Category get(int id);

	boolean add(Category category);

	boolean update(Category category);

	boolean delete(Category category);

	List<Category> list();

}
