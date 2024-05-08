package com.routing_app.backend;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private Date birthday;

    private String gender;

    private boolean wheelchairUser;

    private Date appointment;

    private String startPoint;

    private double startLatitude;

    private double startLongitude;

    private String endPoint;

    private double endLatitude;

    private double endLongitude;

    // Getters
    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Date getBirthday() {
        return birthday;
    }

    public String getGender() {
        return gender;
    }

    public boolean isWheelchairUser() {
        return wheelchairUser;
    }

    public Date getAppointment() {
        return appointment;
    }

    public String getStartPoint() {
        return startPoint;
    }

    public double getStartLatitude() {
        return startLatitude;
    }

    public double getStartLongitude() {
        return startLongitude;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public double getEndLatitude() {
        return endLatitude;
    }

    public double getEndLongitude() {
        return endLongitude;
    }

    // Setters


    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setWheelchairUser(boolean wheelchairUser) {
        this.wheelchairUser = wheelchairUser;
    }

    public void setAppointment(Date appointment) {
        this.appointment = appointment;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }

    public void setStartLatitude(double startLatitude) {
        this.startLatitude = startLatitude;
    }

    public void setStartLongitude(double startLongitude) {
        this.startLongitude = startLongitude;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public void setEndLatitude(double endLatitude) {
        this.endLatitude = endLatitude;
    }

    public void setEndLongitude(double endLongitude) {
        this.endLongitude = endLongitude;
    }

}


