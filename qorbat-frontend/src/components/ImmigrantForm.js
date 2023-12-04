import React, { useState } from 'react';
import { supabase } from '../App'; // Import the supabase client
import "./ImmigrantForm.css";

function ImmigrantForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthCountry: '',
        industry: '',
        subIndustry: '',
        jobTitle: '',
        age: '',
        educationLevel: '',
        yearOfMigration: '',
        gender: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const industries = [
        "Farming and Outdoor Industries",
        "Resource Extraction Industries",
        "Energy and Water Services",
        "Building and Infrastructure Development",
        "Product Creation and Manufacturing",
        "Bulk Goods Distribution",
        "Consumer Retail and Sales",
        "Logistics and Goods Movement",
        "Tech and Information Services", // This will be expanded into subcategories
        "Financial Services and Protection",
        "Property Management and Leasing",
        "Expert Services and Consultancy",
        "Corporate Management",
        "Business Support and Environmental Services",
        "Learning and Education",
        "Medical Services and Care",
        "Culture, Arts, and Leisure",
        "Hospitality and Dining",
        "Miscellaneous Services",
        "Government Services and Operations"
    ];

    const techSubIndustries = [
        "Software Development",
        "IT Services",
        "Telecommunications",
        "E-commerce",
        "Data Management and Analytics",
        "Cybersecurity"
    ];

    const countries = ["Canada", "Iran", "China", "India"];
    const jobTitles = ["Chief Officer", "Founder", "Others"];

    const yearsOfMigration = Array.from({ length: 23 }, (_, i) => (1910 + i * 5) + "-" + (1914 + i * 5));

    const handleIndustryChange = (e) => {
        const industry = e.target.value;
        setFormData({
            ...formData,
            industry: industry,
            subIndustry: industry === "Tech and Information Services" ? techSubIndustries[0] : ''
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        // Check for required fields
        const requiredFields = ['firstName', 'lastName', 'birthCountry', 'industry', 'yearOfMigration', 'gender', 'jobTitle'];
        for (let field of requiredFields) {
            if (!formData[field]) {
                setErrorMessage(`Please fill out the required ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                return;
            }
        }

        const { firstName, lastName, birthCountry, industry, subIndustry, jobTitle, age, educationLevel, yearOfMigration, gender } = formData;
        const response = await supabase
            .from('chineseMigrants_duplicate')
            .insert([
                {
                    Name: `${firstName} ${lastName}`,
                    "Birth Country": birthCountry,
                    Industry: industry === "Tech and Information Services" ? subIndustry : industry,
                    JobTitle: jobTitle,
                    Age: age ? parseInt(age) : null,
                    educationLevel: educationLevel,
                    "Year of Migration": yearOfMigration,
                    Gender: gender
                }
            ]);

        if (response.error) {
            setErrorMessage(response.error.message);
        } else {
            setSuccessMessage('Data submitted successfully!');
            setFormData({
                firstName: '',
                lastName: '',
                birthCountry: '',
                industry: '',
                subIndustry: '',
                jobTitle: '',
                age: '',
                educationLevel: '',
                yearOfMigration: '',
                gender: ''
            });
        }
    };

    return (
        <div className="ImmigrantForm"> {/* Add this class */}
            <h2>Submit a Name</h2>
            <p>Please submit names of individuals who were born outside of the United States and have made a lasting impact in their field of work inside the United States. </p>
            <br>
            </br>
            <p>Criteria to be mindful of when submitting names of individuals:</p>
           
            <p>1. Born outside of the United States and migrated to the U.S.</p>
            
            <p>2. Born outside of the United States and migrated to the U.S.</p>
            
        
            <form onSubmit={handleSubmit}>
                <label>First Name (Required)</label>
                <input type="text" name="firstName" value={formData.firstName} required onChange={handleChange} />
    
                <label>Last Name (Required)</label>
                <input type="text" name="lastName" value={formData.lastName} required onChange={handleChange} />
    
                <label>Country of Origin (Required)</label>
                <select name="birthCountry" value={formData.birthCountry} required onChange={handleChange}>
                    <option value="">Select a country...</option>
                    {countries.map(country => <option key={country} value={country}>{country}</option>)}
                </select>
    
                <label>Industry/Field of Work (Required)</label>
                <select name="industry" value={formData.industry} required onChange={handleIndustryChange}>
                    <option value="">Select an industry...</option>
                    {industries.map(industry => <option key={industry} value={industry}>{industry}</option>)}
                </select>
    
                {formData.industry === "Tech and Information Services" && (
                    <div>
                        <label>Subcategory in Tech (Required)</label>
                        <select name="subIndustry" value={formData.subIndustry} required onChange={handleChange}>
                            {techSubIndustries.map(subIndustry => (
                                <option key={subIndustry} value={subIndustry}>{subIndustry}</option>
                            ))}
                        </select>
                    </div>
                )}
    
                <label>Job Title (Required)</label>
                <select name="jobTitle" value={formData.jobTitle} required onChange={handleChange}>
                    <option value="">Select a job title...</option>
                    {jobTitles.map(title => (
                        <option key={title} value={title}>{title}</option>
                    ))}
                </select>
    
                <label>Current Age (Optional)</label>
                <input type="text" name="age" value={formData.age} pattern="^(?:1[01][0-9]|120|[1-9]?[0-9])$" onChange={handleChange} />
    
                <label>Education (Optional)</label>
                <select name="educationLevel" value={formData.educationLevel} onChange={handleChange}>
                    <option value="">Select education level...</option>
                    <option value="High School">High School</option>
                    <option value="Associate">Associate</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="PhD">PhD</option>
                </select>
    
                <label>Year of Migration (Required)</label>
                <select name="yearOfMigration" value={formData.yearOfMigration} required onChange={handleChange}>
                    <option value="">Select a year range...</option>
                    {yearsOfMigration.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
    
                <label>Gender (Required)</label>
                <select name="gender" value={formData.gender} required onChange={handleChange}>
                    <option value="">Select a gender...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
    
                <button type="submit">Submit</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
    
}
export default ImmigrantForm;
