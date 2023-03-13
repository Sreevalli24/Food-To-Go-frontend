import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchItem from './SearchItem';

function SearchItemsPage(props) {

    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [items, setItems] = useState([]);


    useEffect(() => {
        loadData();
    }, [searchUrl])

    const loadData = async () => {

        const baseUrl = "http://localhost:8080";
        let url = '';
        if (searchUrl === '') {
            url = baseUrl + "/api/items/viewall";
        } else {
            url = baseUrl + searchUrl;
        }
        const response = await fetch(url);
        const responseJson = await response.json();

        setItems(responseJson);
        console.log(responseJson);
    }

    const searchHandleChange = () => {
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/api/items/${search}`)
        }
    }

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-sm-6">
                    <div className='d-flex'>
                        <input className='form-control me-2' type='search'
                            placeholder='Search' aria-labelledby='Search'
                            onChange={e => setSearch(e.target.value)} />
                        <button className='btn btn-outline-success'
                            onClick={() => searchHandleChange()}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <>
                {items.map(items => (
                    <SearchItem key={items.itemId} items={items} />
                ))}
            </>
            <Link className="btn btn-primary" to={"/Consumerview"}>
                Back to Home
            </Link>
        </div>
    );
}

export default SearchItemsPage;
