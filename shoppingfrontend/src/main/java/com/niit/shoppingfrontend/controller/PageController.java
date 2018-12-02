package com.niit.shoppingfrontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PageController {

	@RequestMapping(value = { "/", "/home", "/index" })
	public ModelAndView index() {
		ModelAndView mv = new ModelAndView("page");
		mv.addObject("greeting", "Welcome to Sping web mvc");
		return mv;
	}

	// @RequestParam demo
	@RequestMapping(value = "/test")
	// public ModelAndView index(@RequestParam("greeting") String greeting)
	public ModelAndView index(@RequestParam(value = "greeting", required = false) String greeting) {
		if (greeting == null) {
			greeting = "String Parameter greeting is not present";
		}
		ModelAndView mv = new ModelAndView("page");
		mv.addObject("greeting", greeting);
		return mv;
	}

	// @PathVariable demo
	/*
	 * @RequestMapping(value = "/test/{greeting}") public ModelAndView
	 * index(@PathVariable("greeting") String greeting) { if(greeting == null) {
	 * greeting="String Parameter greeting is not present"; } ModelAndView mv= new
	 * ModelAndView("page"); mv.addObject("greeting", greeting); return mv; }
	 * 
	 */
}
