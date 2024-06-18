package com.routing_app.backend.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {


    @Autowired
    private PersonRepository personRepository;

    public List<Person> getAllPeople() {
        return personRepository.findAll();
    }

    public Optional<Person> getPersonById(Long id) {
        return personRepository.findById(id);
    }

    @Transactional
    public Person savePerson(Person person) {
        return personRepository.save(person);
    }

    @Transactional
    public Optional<Person> updatePerson(Long id, Person personDetails) {
        return personRepository.findById(id).map(person -> {
            person.setFirstName(personDetails.getFirstName());
            person.setLastName(personDetails.getLastName());
            person.setBirthday(personDetails.getBirthday());
            person.setGender(personDetails.getGender());
            person.setWheelchairUser(personDetails.isWheelchairUser());
            person.setAppointment(personDetails.getAppointment());
            person.setStartPoint(personDetails.getStartPoint());
            person.setStartLatitude(personDetails.getStartPointLatitude());
            person.setStartLongitude(personDetails.getStartPointLongitude());
            person.setEndPoint(personDetails.getEndPoint());
            person.setEndPointLatitude(personDetails.getEndPointLatitude());
            person.setEndPointLongitude(personDetails.getEndPointLongitude());
            return personRepository.save(person);
        });
    }

    @Transactional
    public boolean deletePerson(Long id) {
        return personRepository.findById(id).map(person -> {
            personRepository.delete(person);
            return true;
        }).orElse(false);
    }
}
