package com.example.TLBet.service;

import com.example.TLBet.models.entities.SystemLog;
import com.example.TLBet.models.view.SystemLogInView;

public interface SystemLogService {

    SystemLog createSystemLog(SystemLogInView systemLogInView);

}
