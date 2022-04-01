import styled from "styled-components";

//dropdown menu component, used for the quantity dropdown on the ItemDetails page
const Dropdown = ({array, label, stateSetter}) => {

    const handleSelect = (e) => { 
        stateSetter(e.target.value); 
    }

    return (
        <Wrapper>
            <label>{label}</label>
            <select onChange={handleSelect} name="chooseQty" id="chooseQty">
                <option selected disabled>Choose:</option>
               
                    {array.map((el) => {
                        return <option value={el} key={el}>{el}</option>
                    })
                }
            </select>
        </Wrapper>
    )

}

const Wrapper = styled.div`
`
export default Dropdown;