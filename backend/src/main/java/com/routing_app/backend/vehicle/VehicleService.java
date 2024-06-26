package com.routing_app.backend.vehicle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    @Transactional
    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @Transactional
    public Optional<Vehicle> updateVehicle(Long id, Vehicle vehicleDetails) {
        return vehicleRepository.findById(id).map(vehicle -> {
            vehicle.setVehicleName(vehicleDetails.getVehicleName());
            vehicle.setVehicleType(vehicleDetails.getVehicleType());
            vehicle.setWheelchairUser(vehicleDetails.getWheelchairUser());
            vehicle.setVehicleSeats(vehicleDetails.getVehicleSeats());
            vehicle.setCompanyName(vehicleDetails.getCompanyName());
            return vehicleRepository.save(vehicle);
        });
    }

    @Transactional
    public boolean deleteVehicle(Long id) {
        return vehicleRepository.findById(id).map(vehicle -> {
            vehicleRepository.delete(vehicle);
            return true;
        }).orElse(false);
    }
}
