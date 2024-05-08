package com.routing_app.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {


    @Autowired
    private PersonRepository personRepository;

    // Retrieve all vehicles from the database
    public List<Person> getAllPeople() {
        return personRepository.findAll();
    }

    public Optional<Person> getPersonById(Long id) {
        return personRepository.findById(id);
    }

    @Transactional
    public Person savePerson(Person person) {
        Person savedPerson = personRepository.save(person);
        return savedPerson; // Return the saved vehicle
    }

}
