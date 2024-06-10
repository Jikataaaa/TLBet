package com.example.TLBet.models.entities;

import com.example.TLBet.models.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

import java.sql.Timestamp;

@Entity
@Table(name = "system_log")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicUpdate
@DynamicInsert
public class SystemLog extends BaseEntity {

    @Column(name = "exception_name")
    private String exceptionName;

    @Column(name = "stack_trace", columnDefinition = "TEXT", length = 1000000)
    private String stackTrace;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "created_on", columnDefinition = "TIMESTAMP", updatable = false)
    @CreatedDate
    private Timestamp createdOn;
}
