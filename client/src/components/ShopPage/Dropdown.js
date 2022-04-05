import styled from "styled-components";

//Reuseable dropdown menu component, used for the quantity dropdown on the ItemDetails page
//and the shop filters on the Shop page

//array contains the items to populate the dropdown, stateSetter is the state setting function that is used
//to track the selected state of the dropdown, type is a prop used for styling, depending on whether the 
//dropdown is used for the ItemDetails page or the Shop page
const Dropdown = ({ array, label, stateSetter, type }) => {
  const handleSelect = (e) => {
    stateSetter(e.target.value);
  };

  return (
    <Wrapper>
      <label className={(type === "sidebar") ? "bolded" : ""}>{label}</label>
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
    padding-right: 20px;
  }

  .bolded {
    font-family: var(--font-subheading);
  }

  select {
    font-size: 16px;
    width: 125px;
  }
`;

export default Dropdown;
