const Dropdown = ({array, label, handleSelect}) => {

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

export default Dropdown;