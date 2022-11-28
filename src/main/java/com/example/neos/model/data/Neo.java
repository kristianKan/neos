package com.example.neos.model.data;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Neo {

    private String id;
    private String name;
    @JsonProperty("absolute_magnitude_h")
    private double magnitude;
    @JsonProperty("is_potentially_hazardous_asteroid")
    private boolean isHazardous;
    @JsonProperty("close_approach_data")
    public ArrayList<CloseApproachDatum> closeApproachData;
    
}
