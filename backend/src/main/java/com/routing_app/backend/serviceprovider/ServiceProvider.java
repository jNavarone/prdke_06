package com.routing_app.backend.serviceprovider;
import jakarta.persistence.*;

@Entity
@Table(name = "ServiceProvider")
public class ServiceProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String companyName;
    private String eMailAddress;
    private String startPoint;
    private double startPointLatitude;
    private double startPointLongitude;

    //getters
    public Long getId() {
        return id;
    }
    public String getCompanyName() {
        return companyName;
    }
    public String getEMailAddress() {
        return eMailAddress;
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

    //setters
    public void setId(Long id) {
        this.id = id;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    public void setEMailAddress(String eMailAddress) {
        this.eMailAddress = eMailAddress;
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

}
