package com.example.imageapp.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document
public class Image {
    @Id
    private String id;
    private String name;
    private Metadata metadata;
    @Field(targetType = FieldType.BINARY)
    private byte[] imageData;
}
