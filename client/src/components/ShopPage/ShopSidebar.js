import styled from "styled-components";
import Dropdown from "./Dropdown";
import { useState } from "react";

const ShopSidebar = () => {

    const [filter, setFilter] = useState(null);

    const filterOptions = [ "All", "Category", "Body Location", "Company"];

    //arrays of the lists for each filter


    return (
        <Wrapper>
            <Dropdown array={filterOptions} label="Filter by:" stateSetter={setFilter} />

            {( filter === "All" &&
            <>
            </>
            )}
        </Wrapper>
    )


}

export default ShopSidebar; 