package com.example.neos.model.data;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class Feed {

    private Integer element_count;
    @JsonProperty("near_earth_objects")
    private Map<String, List<Neo>> neos = new HashMap<String, List<Neo>>();

    public Map<String, List<Neo>> getNeos() {
        return neos;
    }
    public void setNeos(Map<String, List<Neo>> neos) {
        this.neos = neos;
    }
}