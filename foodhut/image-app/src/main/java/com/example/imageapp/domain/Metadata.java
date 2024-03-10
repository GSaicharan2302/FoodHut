package com.example.imageapp.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class Metadata {
    private String imageOf;
    private String fileType;
    private String imageType;
}
