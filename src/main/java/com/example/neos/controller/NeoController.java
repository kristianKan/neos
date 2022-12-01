package com.example.neos.controller;

import com.example.neos.model.data.Feed;
import com.example.neos.model.data.Neo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.neos.service.NeoService;

@RestController
@RequestMapping("/")
public class NeoController {

    @Autowired
    NeoService neoService;

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(method = RequestMethod.GET, path = "feed/{start}&{end}&{apiKey}")
    public Feed getNeosFeed(@PathVariable("start") String start, @PathVariable("end") String end, @PathVariable("apiKey") String apiKey){
        return neoService.getNeoFeed(start, end, apiKey);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(method = RequestMethod.GET, path = "neo/{id}&{apiKey}")
    public Neo getNeoById(@PathVariable("id") String id, @PathVariable String apiKey){
        return neoService.getNeoById(id, apiKey);
    }

}