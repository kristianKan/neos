package com.example.neos.service;

import com.example.neos.model.data.Feed;
import com.example.neos.model.data.Neo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class NeoService {

    @Autowired
    private RestTemplate template = new RestTemplate();

    public Feed getNeoFeed(String start, String end, String apiKey) {
        String url = UriComponentsBuilder.newInstance()
            .scheme("https")
            .host("api.nasa.gov")
            .path("neo/rest/v1/feed")
            .queryParam("start_date", start)
            .queryParam("end_date", end)
            .queryParam("api_key", apiKey)
            .build()
            .toUriString();
        return template.getForObject(url, Feed.class);
    }

    public Neo getNeoById(String id, String apiKey) {
        String url = UriComponentsBuilder.newInstance()
            .scheme("https")
            .host("api.nasa.gov")
            .path("neo/rest/v1/neo/" + id)
            .queryParam("api_key", apiKey)
            .build()
            .toUriString();
        return template.getForObject(url, Neo.class);
    }
}