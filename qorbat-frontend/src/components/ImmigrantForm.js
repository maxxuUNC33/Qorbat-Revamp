import React, { useState } from 'react';
import { supabase } from '../App';  // Import the supabase client

function ImmigrantForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthCountry: '',
        industry: '',
        age: '',
        educationLevel: '',
        yearOfMigration: '',
        gender: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const industries = [
        "Agriculture, Forestry, Fishing and Hunting",
        "Mining, Quarrying, and Oil and Gas Extraction",
        "Utilities",
        "Construction",
        "Manufacturing",
        "Wholesale Trade",
        "Retail Trade",
        "Transportation and Warehousing",
        "Information",
        "Finance and Insurance",
        "Real Estate and Rental and Leasing",
        "Professional, Scientific, and Technical Services",
        "Management of Companies and Enterprises",
        "Administrative and Support and Waste Management and Remediation Services",
        "Educational Services",
        "Health Care and Social Assistance",
        "Arts, Entertainment, and Recreation",
        "Accommodation and Food Services",
        "Other Services (except Public Administration)",
        "Public Administration"
    ];

    const countries = ["Canada", "Iran", "China", "India"];

    const yearsOfMigration = Array.from({ length: 23 }, (_, i) => (1910 + i * 5) + "-" + (1915 + i * 5));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        // Check for required fields
        const requiredFields = ['firstName', 'lastName', 'birthCountry', 'industry', 'yearOfMigration', 'gender'];
        for (let field of requiredFields) {
            if (!formData[field]) {
                setErrorMessage(`Please fill out the required ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                return;
            }
        }

        const { firstName, lastName, birthCountry, industry, age, educationLevel, yearOfMigration, gender } = formData;
        const response = await supabase
            .from('chineseMigrants_duplicate')
            .insert([
                {
                    Name: `${firstName} ${lastName}`,
                    "Birth Country": birthCountry,
                    Industry: industry,
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
                age: '',
                educationLevel: '',
                yearOfMigration: '',
                gender: ''
            });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            
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
                <select name="industry" value={formData.industry} required onChange={handleChange}>
                    <option value="">Select an industry...</option>
                    {industries.map(industry => <option key={industry} value={industry}>{industry}</option>)}
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
