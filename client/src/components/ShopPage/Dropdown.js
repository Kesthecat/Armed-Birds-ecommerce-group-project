import styled from "styled-components";

//dropdown menu component, used for the quantity dropdown on the ItemDetails page
const Dropdown = ({ array, label, stateSetter }) => {
  const handleSelect = (e) => {
    stateSetter(e.target.value);
    console.log("selected qt", e.target.value);
  };

  return (
    <Wrapper>
      <label>{label}</label>
      <select onChange={handleSelect} name="chooseQty" id="chooseQty">
        <option selected disabled value={"Choose"}>
          Choose:
        </option>
        {array.map((el) => {
          return (
            <option value={el} key={el}>
              {el}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: var(--font-body);
  font-size: 18px;
  label {
    margin-right: 20px;
    padding-right: 20px;
  }

  select {
    font-size: 18px;
    width: 100px;
  }
`;
export default Dropdown;
