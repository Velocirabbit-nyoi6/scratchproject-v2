import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import ResultRow from './ResultRow.jsx'
import NavBar from './NavBar.jsx';

const SearchPage = (props) => {
    const [categories, setCategories] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [tags, setTags] = useState([]);
    const [results, setResults] = useState([]);
    const rows = [];

    const handleChange = (selectedOptions, actionMeta) => {
        if (actionMeta.name === 'categories') {
            const selectedValues = selectedOptions.map(option => option.value);
            setCategories([...new Set(selectedValues)]);
        } else if (actionMeta.name === 'neighborhoods') {
            const selectedValues = selectedOptions.map(option => option.value);
            setNeighborhoods([...new Set(selectedValues)]);
        } else if (actionMeta.name === 'tags') {
            const selectedValues = selectedOptions.map(option => option.value);
            setTags([...new Set(selectedValues)]);
        }
    };

    const querySQL = () => {
        const toQuery = {
            categories: categories,
            neighborhoods: neighborhoods,
            tags: tags
        }
    
        const requestBody = JSON.stringify(toQuery);
    
        fetch('api/placeSearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        })
        .then((response) => response.json())
        .then((output) => {
            setResults(output)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    

    const categoriesOptions = [
        { value:'Brewery', label:'Brewery' },
        { value:'Cafe', label:'Cafe' },
        { value:'Library', label:'Library' },
        { value:'Park', label:'Park' }
    ]
    const neighborhoodOptions = [
        { value:'Battery Park City', label:'Battery Park City' },
        { value:'Chelsea', label:'Chelsea' },
        { value:'City Hall', label:'City Hall' },
        { value:'Clinton', label:'Clinton' },
        { value:'East Harlem', label:'East Harlem' },
        { value:'East Village', label:'East Village' },
        { value:'Gramercy Park', label:'Gramercy Park' },
        { value:'Hamilton Heights', label:'Hamilton Heights' },
        { value:'Harlem', label:'Harlem' },
        { value:'Lower East Side', label:'Lower East Side' },
        { value:'Meatpacking District', label:'Meatpacking District' },
        { value:'Midtown East', label:'Midtown East' },
        { value:'Midtown West', label:'Midtown West' },
        { value:'Morningside Heights', label:'Morningside Heights' },
        { value:'Murray Hill', label:'Murray Hill' },
        { value:'Noho/Soho', label:'Noho/Soho' },
        { value:'Theater District', label:'Theater District' },
        { value:'Tribeca', label:'Tribeca' },
        { value:'Upper East Side', label:'Upper East Side' },
        { value:'Upper West Side', label:'Upper West Side' },
        { value:'Wall Street', label:'Wall Street' },
        { value:'Washington Heights', label:'Washington Heights' }
    ]
    const tagOptions = [
        { value:'Good Coffee', label:'Good Coffee' },
        { value:'Strong Wifi', label:'Strong Wifi' },
        { value:'Quiet', label:'Quiet' },
        { value:'Social', label:'Social' },
        { value:'Clean Bathrooms', label:'Clean Bathrooms' },
        { value:'Abundant Outlets', label:'Abundant Outlets' },
        { value:'Outdoor Seating', label:'Outdoor Seating' },
        { value:'Big Group Friendly', label:'Big Group Friendly' }
    ]

    return (
        <div className="container">
            <NavBar />
            <div className='searchContainer bg-dark'>
                <div className='d-flex justify-content-center'>
                    <div className='filterBar d-flex'>
                        <label>Category</label>
                            <ReactSelect placeholder='Category' name='categories' options={categoriesOptions} value={categories.map(value => ({ value, label: value }))} onChange={handleChange} isMulti/>
                        <label>Neighborhood</label>
                            <ReactSelect placeholder='Neighborhood' name='neighborhoods' options={neighborhoodOptions} value={neighborhoods.map(value => ({ value, label: value }))} onChange={handleChange} isMulti/>
                        <label>Tags</label>
                            <ReactSelect placeholder='Tags' name='tags' options={tagOptions} value={tags.map(value => ({ value, label: value }))} onChange={handleChange} isMulti/>
                        
                    </div>
                </div>
                <br/>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-light " onClick={querySQL}>Find!</button>
                </div>
                <table class="table table-dark table-hover">
                <thead>
                        <tr>
                            <th>Place</th>
                            <th>Address</th>
                            <th>Rate/Save</th>
                        </tr>
                    </thead>
                    <tbody class="table-striped">
                        {results.map((result, index) => (
                            <ResultRow key={index} result={result} username={props.username} />
                        ))}
                    </tbody>
                    
                </table>
            </div>
        </div>
    )

};

export default SearchPage;