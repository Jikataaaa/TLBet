package com.example.TLBet.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.HierarchicalMessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

@Configuration
public class ExceptionsMessageConfig {

    @Bean
    @Qualifier("bundles")
    public HierarchicalMessageSource exceptionsMessageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasenames("classpath:exceptions");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }
}
