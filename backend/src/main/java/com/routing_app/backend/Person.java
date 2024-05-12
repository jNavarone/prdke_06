package com.routing_app.backend;

import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "Persons")
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

    private double startPointLatitude;

    private double startPointLongitude;

    private String endPoint;

    private double endPointLatitude;

    private double endPointLongitude;

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

    public double getStartPointLatitude() {
        return startPointLatitude;
    }

    public double getStartPointLongitude() {
        return startPointLongitude;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public double getEndPointLatitude() {
        return endPointLatitude;
    }

    public double getEndPointLongitude() {
        return endPointLongitude;
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
        this.startPointLatitude = startLatitude;
    }

    public void setStartLongitude(double startLongitude) {
        this.startPointLongitude = startLongitude;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public void setEndPointLongitude(double endLongitude) {
        this.endPointLongitude = endLongitude;
    }

    public void setEndPointLatitude(double endLatitude) {
        this.endPointLatitude = endLatitude;
    }

}


