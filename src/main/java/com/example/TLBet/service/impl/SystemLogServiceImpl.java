package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.SystemLog;
import com.example.TLBet.models.view.SystemLogInView;
import com.example.TLBet.repository.SystemLogRepository;
import com.example.TLBet.service.SystemLogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Slf4j
@Service
public class SystemLogServiceImpl implements SystemLogService {

    @Autowired
    private SystemLogRepository systemLogRepository;

    @Override
    public void createSystemLog(SystemLogInView systemLogInView) {

        SystemLog systemLog = new SystemLog();
        systemLog.setExceptionName(systemLogInView.getExceptionName());
        systemLog.setStackTrace(systemLogInView.getStackTrace());
        systemLog.setUserId(systemLogInView.getUserId());
        systemLog.setCreatedOn(Timestamp.valueOf(LocalDateTime.now()));
        systemLogRepository.save(systemLog);
    }
}
