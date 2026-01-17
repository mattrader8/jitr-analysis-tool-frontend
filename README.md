# JITR Analysis Tool (Frontend)

## Overview

This repository contains the **frontend** source code for a **web application** completed during my time at Praxis Engineering in **2021**.

The project was designed to provide a simple analysis capability for Just-in-Time Requirement (JITR) proposal submissions. A JITR was a common acquisition strategy for one of the government agencies we supported. These proposal submissions included various metadata, such as response content (i.e., text), status, rating, etc. Users of this application were able to view a history of proposal submissions, filter based on metadata, and add, update, and delete submissions.

**Purpose of this repository**:<br>
This project is maintained on GitHub as a **reference implementation** showcasing my approach to REST API design and development within the Java Spring Boot framework. Note that evironment-specific configuration is required to run locally.

## Project Goals
The primary goals of this project were to:
- Enable users to browse and inspect historical proposal submissions with intuitive UI elements
- Give users quick insights into proposal trends and metadata patterns
- Support interactive filtering and searching by key metadata fields
- Demonstrate proficiency with modern frontend tooling

## Key Features
 - Proposal browsing, searching, and filtering via AG Grid (https://www.ag-grid.com/)
 - Basic CRUD operations (e.g., create, read, update, delete)
 - Administrative page to allow for advanced database administration

## Design 
The following section includes example documentation from the overall design process.

Application Architecture

<img width="857" height="560" alt="ProjectModel" src="https://github.com/user-attachments/assets/d8956132-5c47-4499-9913-5eba9f9e777d" />

Database Entity Relationship Diagram (ERD)

<img width="681" height="484" alt="JiTRAnalysisERDUpdate" src="https://github.com/user-attachments/assets/9e9d485f-e55d-4986-a88d-5e24dd57a006" />

"Add JITR" Page

<img width="1917" height="972" alt="AddJITRUI" src="https://github.com/user-attachments/assets/b4466383-964d-4691-a27b-96d575e853d2" />

