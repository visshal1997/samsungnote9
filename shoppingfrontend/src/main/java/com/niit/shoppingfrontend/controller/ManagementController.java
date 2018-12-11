package com.niit.shoppingfrontend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.niit.shoppingbackend.dao.CategoryDAO;
import com.niit.shoppingbackend.dao.ProductDAO;
import com.niit.shoppingbackend.dto.Category;
import com.niit.shoppingbackend.dto.Product;

@Controller
@RequestMapping(value="/manage")
public class ManagementController {

	@Autowired
	private CategoryDAO categoryDAO;
	@Autowired
	private ProductDAO productDAO;
	
	private static final Logger logger = LoggerFactory.getLogger(ManagementController.class);
	
	
	@RequestMapping(value = "/products", method=RequestMethod.GET)
	public ModelAndView showManageProducts(@RequestParam(name="operation", required=false) String operation) {
						
		ModelAndView mv = new ModelAndView("page");
		mv.addObject("title", "Manage Products");
		mv.addObject("userClickManageProducts", true);
		Product nproduct = new Product();
		
		nproduct.setActive(true);
		nproduct.setSupplierId(1);
		mv.addObject("product", nproduct);
		
		/*
		 * to
		 */
		if(operation!=null) {
			if(operation.equals("product")){
			mv.addObject("message", "Product is added Successfully!");	
			}
					
		}
		
		return mv;
	}
	
	
	//handling product submission
	@RequestMapping(value = "/products", method=RequestMethod.POST)
	public String handleFormSubmission(@ModelAttribute("product") Product mproduct) {
		
		logger.info(mproduct.toString());
		
		//to add the modified product to table
		productDAO.add(mproduct);
		return "redirect:/manage/products?operation=product";
	
	}
	
	
	//returning categories for all the request mappings in this controller
	@ModelAttribute("categories")
	public List<Category> getCategories(){
		return categoryDAO.list();
	}
	
	
	
	
	
	
	
	
	
	
}
