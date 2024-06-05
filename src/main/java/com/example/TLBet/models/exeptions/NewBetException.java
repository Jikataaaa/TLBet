package com.example.TLBet.models.exeptions;

public class NewBetException extends RuntimeException {
    public NewBetException(String message){
        super(message);
    }
    public NewBetException(){
        super();
    }
}
