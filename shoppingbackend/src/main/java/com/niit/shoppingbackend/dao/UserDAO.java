package com.niit.shoppingbackend.dao;

import java.util.List;

import com.niit.shoppingbackend.dto.Address;
import com.niit.shoppingbackend.dto.Cart;
import com.niit.shoppingbackend.dto.User;


public interface UserDAO {
	
	//add a user
	public boolean addUser(User user);
	
	//get user by email
	User getByEmail(String email);
	
	//update a user Cart
	boolean updateCart(Cart cart);
	
	//add an address
	boolean addAddress(Address address);
	
	//get the billing address by user
	Address getBillingAddress(int userId);
	
	//list of shipping addresses
	List<Address> listShippingAddress(int userId);
	
	
	
	
}
