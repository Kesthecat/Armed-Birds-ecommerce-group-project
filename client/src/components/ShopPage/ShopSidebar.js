import styled from "styled-components";
import Dropdown from "./Dropdown";
import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";
import { CompaniesContext } from "../BrandsPage/CompaniesContext";

const ShopSidebar = () => {

    const { state: { status, products }, filter, setFilter, subfilter, setSubfilter } = useContext(ProductsContext);
    const { state: { companiesStatus, companies } } = useContext(CompaniesContext);

    const filterOptions = [ "All", "Category", "Body Location", "Brand"];
    //after filter selected, show list of the subfilters for that filter
    
    if (filter === "All" || filter === null) {
        setSubfilter(null);
    }

    let uniqueCategories = [];
    let uniqueBodyLocations = [];
    let uniqueBrands = [];

    //arrays of the subfilters
    if (status === "idle") {

        //array of categories
        const categories = products.map((product) => {
            return product.category;
        })
        
        uniqueCategories = [...new Set(categories)];

        //array of body locations
        const bodyLocations = products.map((product) => {
            return product.body_location;
        })
        
        uniqueBodyLocations = [...new Set(bodyLocations)];
    }

    if (companiesStatus === "idle") {
        // array of brands
        const brands = companies.map((company) => {
            return company.name;
        })
        
        uniqueBrands = [...new Set(brands)];

    }

    const handleClick = (e) => {
        const className = e.target.className; 
        setSubfilter(className);
        console.log(subfilter);
    }


    return (
        <Wrapper>
            <DropdownDiv>
                <Dropdown array={filterOptions} label="Filter by:" stateSetter={setFilter} />
            </DropdownDiv>

            {( status === "idle" && filter === "Category" && 
            <List>
                {uniqueCategories.map((cat) => {
                    return <button key={cat} className={cat} selected={(subfilter === cat)} onClick={handleClick} >{cat}</button>
                })}
            </List>
            )}

            {( status === "idle" && filter === "Body Location" && 
            <List>
                {uniqueBodyLocations.map((loc) => {
                    return <button key={loc} selected={(subfilter === loc)} onClick={handleClick} className={loc}>{loc}</button>
                })}
            </List>
            )}

            {( companiesStatus === "idle" && status === "idle" && filter === "Brand" && 
            <List>
                {uniqueBrands.map((brand) => {
                    return <button key={brand} selected={(subfilter === brand)} onClick={handleClick} className={brand}>{brand}</button>
                })}
            </List>
            )}
        </Wrapper>
    )


}

const Wrapper = styled.div`
    width: 18vw;
    padding-top: 160px;
`;

const DropdownDiv = styled.div`
   margin: 0 auto;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    
    button {
        background-color: white;
        color: var(--color-main);
        border: none;
        text-align: left;
        font-family: var(--font-subheading);
        font-size: 18px;
        margin: 6px 10px 6px 20px;
        text-decoration: ${props => (props.selected ? "underline" : "none")};
        font-weight: ${props => (props.selected ? "bold" : "400")};

    }

`;

export default ShopSidebar; 