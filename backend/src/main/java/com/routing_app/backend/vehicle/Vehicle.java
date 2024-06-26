package com.routing_app.backend.vehicle;

import jakarta.persistence.*;

@Entity
@Table(name = "Vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleName;

    private String vehicleType;

    private boolean wheelchairUser;

    private int vehicleSeats;

    private String companyName;

    // Getters
    public Long getId() {
        return id;
    }

    // Getters
    public String getVehicleName() {
        return vehicleName;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public boolean getWheelchairUser() {
        return wheelchairUser;
    }

    public int getVehicleSeats() {
        return vehicleSeats;
    }

    public String getCompanyName() {
        return companyName;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    //Setters
    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public void setWheelchairUser(boolean wheelchairUser) {
        this.wheelchairUser = wheelchairUser;
    }

    public void setVehicleSeats(int vehicleSeats) {
        this.vehicleSeats = vehicleSeats;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}
