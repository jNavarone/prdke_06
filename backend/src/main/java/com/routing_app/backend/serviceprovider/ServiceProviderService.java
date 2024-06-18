package com.routing_app.backend.serviceprovider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceProviderService {

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    public List<ServiceProvider> getAllServiceProviders() {
        return serviceProviderRepository.findAll();
    }

    public Optional<ServiceProvider> getServiceProviderById(Long id) {
        return serviceProviderRepository.findById(id);
    }

    @Transactional
    public ServiceProvider saveServiceProvider(ServiceProvider serviceProvider) {
        return serviceProviderRepository.save(serviceProvider);
    }

    @Transactional
    public Optional<ServiceProvider> updateServiceProvider(Long id, ServiceProvider serviceProviderDetails) {
        return serviceProviderRepository.findById(id).map(serviceProvider -> {
            serviceProvider.setCompanyName(serviceProviderDetails.getCompanyName());
            serviceProvider.setEMailAddress(serviceProviderDetails.getEMailAddress());
            serviceProvider.setStartPoint(serviceProviderDetails.getStartPoint());
            serviceProvider.setStartLatitude(serviceProviderDetails.getStartPointLatitude());
            serviceProvider.setStartLongitude(serviceProviderDetails.getStartPointLongitude());
            return serviceProviderRepository.save(serviceProvider);
        });
    }

    @Transactional
    public boolean deleteServiceProvider(Long id) {
        return serviceProviderRepository.findById(id).map(serviceProvider -> {
            serviceProviderRepository.delete(serviceProvider);
            return true;
        }).orElse(false);
    }


}
