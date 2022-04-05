import styled from "styled-components";
import Dropdown from "./Dropdown";
import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";
import { CompaniesContext } from "../BrandsPage/CompaniesContext";

//Sidebar on the shop page where user can choose filters which display as a clickable list below the select
const ShopSidebar = () => {

    //product and company data and functions from context
    const { state: { status, products }, 
            filter, setFilter, 
            subfilter, setSubfilter, 
            sort, setSort } = useContext(ProductsContext);
    const { state: { companiesStatus, companies } } = useContext(CompaniesContext);

    //the filter options for the dropdown
    const filterOptions = [ "All", "Category", "Body Location", "Brand", "In Stock"];

    //sort options for the dropdown
    const sortOptions = ["None", "Price", "Name", "Most Stock", "Least Stock"];
    
    //if displaying all, there are no subfilters to display
    if (filter === "All" || filter === null) {
        setSubfilter(null);
    }

    //arrays of the subfilters for each filter category
    let uniqueCategories = [];
    let uniqueBodyLocations = [];
    let uniqueBrands = [];

    //arrays of the subfilters
    if (status === "idle") {

        //array of categories
        const categories = products.map((product) => {
            return product.category;
        })
        
        //array of just the unique category values
        uniqueCategories = [...new Set(categories)];

        //array of body locations
        const bodyLocations = products.map((product) => {
            return product.body_location;
        })

        //array of just the unique body locations
        uniqueBodyLocations = [...new Set(bodyLocations)];
    }

    if (companiesStatus === "idle") {
        // array of brands
        const brands = companies.map((company) => {
            return company.name;
        })

        //array of just the unique brand values
        uniqueBrands = [...new Set(brands)];

    }

    //when a subfilter is clicked, get its name from the className and save it in state
    const handleFilterClick = (e) => {
        const className = e.target.className; 
        setSubfilter(className);
    }

    return (
        <Wrapper>
            <DropdownDiv>
                <Dropdown array ={sortOptions} label="Sort by:" stateSetter={setSort} type="sidebar" />
                <Dropdown array={filterOptions} label="Filter by:" stateSetter={setFilter} type="sidebar"/>
            </DropdownDiv>

            {( status === "idle" && filter === "Category" && 
            <List>
                {uniqueCategories.map((cat) => {
                    let chosen = "";
                    if (subfilter === cat) {
                        chosen = " chosen";
                    }
                    return <button key={cat} 
                    onClick={handleFilterClick} className={cat + chosen}>{cat}</button>
                })}
            </List>
            )}

            {( status === "idle" && filter === "Body Location" && 
            <List>
                {uniqueBodyLocations.map((loc) => {
                    let chosen = "";
                    if (subfilter === loc) {
                        chosen = " chosen";
                    }
                    return <button key={loc} 
                    onClick={handleFilterClick} className={loc + chosen}>{loc}</button>
                })}
            </List>
            )}

            {( companiesStatus === "idle" && status === "idle" && filter === "Brand" && 
            <List>
                {uniqueBrands.map((brand) => {
                    let chosen = "";
                    if (subfilter === brand) {
                        chosen = " chosen";
                    }
                    return <button key={brand} selected={(subfilter === brand)} 
                    onClick={handleFilterClick} className={brand + chosen}>{brand}</button>
                })}
            </List>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 16vw;
    padding-top: 160px;
    position: sticky;
`;

const DropdownDiv = styled.div`
   padding-right: 0;
   display: flex;
   flex-direction: column;
   align-items: flex-end;

   * {
       margin: 5px 0;
   }
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 20px;
    
    .chosen {
            text-decoration: underline;
            text-underline-position: under; 
            font-weight: bold;
            color: var(--color-secondary);
        }

    button {
        background-color: white;
        color: var(--color-main);
        border: none;
        font-family: var(--font-subheading);
        font-size: 18px;
        margin: 6px 0;
        text-align: right;


    }
`;

export default ShopSidebar; 