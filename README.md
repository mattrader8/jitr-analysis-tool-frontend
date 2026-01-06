# JITR Analysis Tool (Frontend)

## Overview

This repository contains the **frontend** source code for a **web application** completed during my time at Praxis Engineering in **2021**.

The project was designed to provide a simple analysis capability for Just-in-Time Requirement (JITR) proposal submissions. A JITR was a common acquisition strategy for one of the government agencies we supported. These proposal submissions included various metadata, such as response content (i.e., text), status, rating, etc. Users of this application were able to view a history of proposal submissions, filter based on metadata, and add, update, and delete submissions.

**Purpose of this repository**:<br>
This project is maintained on GitHub as a **reference implementation** showcasing my approach to REST API design and development within the Java Spring Boot framework. Note that evironment-specific configuration is required to run locally.

## Project Goals
The primary goals of this project were to:
- Design and develop a functional REST API implemented using the Java Spring Boot framework
- Connect server-side code to an external relational database (i.e., MySQL)
- Implement basic CRUD operations for application data
- Gain experience with core Spring Boot features (e.g., beans, annotations, etc.)

## Key Features
 - Data models to map JITR data to server-side entities
 - Repositories to manage data persistence and access, simplifying interactions with the database
 - Services to handle the business logic of the server-side application
 - RestControllers hosting the core methods of the overall API
